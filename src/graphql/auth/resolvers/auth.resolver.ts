/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth } from "../../../api/auth";
import {
  userLoginBody,
  userRegisterBody,
  userChangePasswordBody,
} from "../../../api/auth/interface/user.interface";
import { getUser } from "../../../api/auth/services/get_user.services";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import { responseMessage } from "../../../utilities/response_message";

const auth = new Auth();

export const authResolver = {
  Query: {
    getUser: async () => {
      getUser();
    },
  },
  Mutation: {
    /* The code block `async (_: any, __: any, context: any) => { ... }` is an asynchronous function
    that serves as the resolver for the `GenerateQrCode` mutation in the GraphQL schema. */
    GenerateQrCode: async (_: any, __: any, context: any) => {
      try {
        if (context && !context.user) throw APP_ERROR("user not authenticated");
        const generate_otp = await auth.generate_qr_code(context.user._id);
        if (!generate_otp) throw APP_ERROR("otp not generated");
        return responseMessage({
          data: { qr: generate_otp },
          message: "scan the qr to an authenticator app",
          success_status: true,
        });
      } catch (error) {
        throw APP_ERROR("error generating qr");
      }
    },
    /* The code block `async (_: any, data: Omit<userLoginBody, "otp">) => { ... }` is an asynchronous
    function that serves as the resolver for the `Login` mutation in the GraphQL schema. */
    Login: async (_: any, data: Omit<userLoginBody, "otp">) => {
      try {
        const token = await auth.login(data);
        if (!token)
          throw APP_ERROR(
            "invalid email or password or token",
            HTTP_RESPONSE.BAD_REQUEST
          );
        return responseMessage({
          data: { token },
          message: "login successfully",
          success_status: true,
        });
      } catch (error) {
        throw APP_ERROR(`${error}`);
      }
    },

    /* The code block `async (_: any, data: userLoginBody) => { ... }` is an asynchronous function that
    serves as the resolver for the `LoginWithOtp` mutation in the GraphQL schema. */
    LoginWithOtp: async (_: any, data: userLoginBody) => {
      try {
        const token = await auth.login_with_otp(data);
        if (!token)
          throw APP_ERROR(
            "invalid email or password or token",
            HTTP_RESPONSE.BAD_REQUEST
          );
        return responseMessage({
          data: { token },
          message: "login successfully",
          success_status: true,
        });
      } catch (error) {
        throw APP_ERROR(`${error}`);
      }
    },
    /* The code block is an asynchronous function that serves as the resolver for the `Register`
    mutation in the GraphQL schema. */
    Register: async (_: any, data: userRegisterBody) => {
      try {
        const get_reg_status = await auth.register(data);

        return responseMessage({
          data: get_reg_status,
          message:
            "user successfully registered use the qr code to generate token in any authenticator app",
          success_status: true,
        });
      } catch (error) {
        throw APP_ERROR(`${error}`);
      }
    },
    /* The code block is an asynchronous function that serves as the resolver for the `ChangePassword`
    mutation in the GraphQL schema. */
    ChangePassword: async (
      _: any,
      data: Omit<userChangePasswordBody, "id">,
      context: any
    ) => {
      try {
        if (context && !context.user) throw APP_ERROR("user not authenticated");
        const dat = await auth.change_password({
          id: context.user._id,
          new_password: data.new_password,
          password: data.password,
        });

        return responseMessage({
          data: { message: dat },
          message: "password changed successfully",
          success_status: true,
        });
      } catch (error) {
        throw APP_ERROR("error changing ");
      }
    },
  },
};
