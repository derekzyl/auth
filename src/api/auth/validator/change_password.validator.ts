import Joi from "joi";
import { password_regex } from "../../../utilities/regex";
import { userChangePasswordBody } from "../interface/user.interface";
export const userChangePasswordSchema = Joi.object<userChangePasswordBody>({
  id: Joi.object().required(),
  password: Joi.string().pattern(password_regex).required(),
  new_password: Joi.string().pattern(password_regex).required(),
});
