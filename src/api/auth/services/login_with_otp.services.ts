/* eslint-disable @typescript-eslint/no-explicit-any */
import BCRYPT from "../../../utilities/bcrypt";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import JWT from "../../../utilities/jwt";
import { logger } from "../../../utilities/logger";
import { OneTimePassword } from "../../../utilities/otp";
import { userLoginBody } from "../interface/user.interface";
import { USER } from "../model";
import { userLogWithOtpSchema } from "../validator/login_with_otp.validator";

export const loginWithOtp = async (user_data: userLoginBody) => {
  try {
    //   1)  we use joi to validate the incoming email and password
    /* The line `const { error, warning, value } = userLogSchema.validate(user_data);` is using the
    `validate` method of the `userLogSchema` object to validate the `user_data` object. */
    const { error, warning, value } = userLogWithOtpSchema.validate(user_data);

    // 2) we check for error and return it
    if (error) {
      throw APP_ERROR(error.details as any, HTTP_RESPONSE.BAD_REQUEST);
    }
    //   3) we check if there is any warning and log to console
    warning ? logger.warn(warning) : "";

    //4) check if the user is existing

    const find_user = await USER.findOne({ email: value.email.toLowerCase() });
    if (!find_user)
      throw APP_ERROR("invalid email or password", HTTP_RESPONSE.BAD_REQUEST);

    // 5) validate password
    const check_if_user_password_is_valid = await BCRYPT.compare(
      value.password,
      find_user.password
    );
    if (!check_if_user_password_is_valid)
      throw APP_ERROR("invalid email or password", HTTP_RESPONSE.BAD_REQUEST);

    //   6)  validate OTP
    const otp = new OneTimePassword();

    const verify_otp = otp.verifyOTP({
      secret_key: find_user.secret_key,
      token: user_data.otp,
    });

    if (!verify_otp)
      throw APP_ERROR("otp is not valid", HTTP_RESPONSE.BAD_REQUEST);

    const expire = process.env.JWT_EXPIRE || "1d";
    /* 7) The code `const token = JWT.generateToken({ id: find_user._id }, { expiresIn: expire });` is
    generating a JSON Web Token (JWT) for the authenticated user. */
    const token = JWT.generateToken(
      { id: find_user._id },
      { expiresIn: expire }
    );
    return token;
  } catch (error) {
    return error;
  }
};
