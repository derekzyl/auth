/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "../../../utilities/logger";
import BCRYPT from "../../../utilities/bcrypt";
import { USER } from "../model";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import JWT from "../../../utilities/jwt";
import { userRegSchema } from "../validator";
import { userRegisterBody } from "../interface/user.interface";

export const register = async (user_data: userRegisterBody) => {
  try {
    //   1)  we use joi to validate the incoming email and password
    /* The line `const { error, warning, value } = userLogSchema.validate(user_data);` is using the
    `validate` method of the `userLogSchema` object to validate the `user_data` object. */
    const { error, warning, value } = userRegSchema.validate(user_data);

    // 2) we check for error and return it
    if (error) {
      throw APP_ERROR(error.details as any, HTTP_RESPONSE.BAD_REQUEST);
    }
    //   3) we check if there is any warning and log to console
    warning ? logger.warn(warning) : "";

    //4) we check database to see if the user email is already existing

    const find_user = await USER.findOne({ email: value.email });
    if (find_user)
      throw APP_ERROR(
        "user already exist kindly login or go to the forgot section to update your password ",
        HTTP_RESPONSE.BAD_REQUEST
      );
    const encrypt_password = await BCRYPT.hash(value.password);
    // 5) initialise create user schema
    const create_user = new USER({
      email: value.email.toLowerCase(),
      password: encrypt_password,
    });

    // 6) save the user data to database
    const created_user = await create_user.save();
    if (!created_user)
      throw APP_ERROR(
        "user not created successfully",
        HTTP_RESPONSE.NOT_IMPLEMENTED
      );

    const expire = process.env.JWT_EXPIRE || "1d";
    const token = JWT.generateToken(
      { id: created_user._id },
      { expiresIn: expire }
    );
    return { token };
  } catch (error) {
    throw APP_ERROR(`${error}`);
  }
};
