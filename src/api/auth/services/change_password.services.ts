/* eslint-disable @typescript-eslint/no-explicit-any */
import BCRYPT from "../../../utilities/bcrypt";
import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import { logger } from "../../../utilities/logger";
import { userChangePasswordBody } from "../interface/user.interface";
import { USER } from "../model";
import { userChangePasswordSchema } from "../validator";

export const changePassword = async (data: userChangePasswordBody) => {
  //   1)  we use joi to validate the incoming email and password
  /* The line `const { error, warning, value } = userLogSchema.validate(user_data);` is using the
    `validate` method of the `userLogSchema` object to validate the `user_data` object. */
  const { error, warning, value } = userChangePasswordSchema.validate(data);

  // 2) we check for error and return it
  if (error) {
    throw APP_ERROR(error.details as any, HTTP_RESPONSE.BAD_REQUEST);
  }
  //   3) we check if there is any warning and log to console
  warning ? logger.warn(warning) : "";

  //4) check if the user is existing

  const find_user = await USER.findById(value.id);
  if (!find_user)
    throw APP_ERROR(
      "unexpected error occurred kindly login to continue",
      HTTP_RESPONSE.EXPECTATION_FAILED
    );
  // 5) check if the old password is valid
  const check_old_password = BCRYPT.compare(data.password, find_user.password);
  if (!check_old_password)
    throw APP_ERROR(
      "your password is incorrect kindly go to the reset password section if you forgot your password",
      HTTP_RESPONSE.BAD_REQUEST
    );
  // 6) hash the new password and save
  const new_password = await BCRYPT.hash(data.new_password);
  find_user.password = new_password;
  find_user.password_changed_at = new Date();
  find_user.save();

  return "password changed successfully";
};
