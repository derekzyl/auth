import Joi from "joi";
import { password_regex } from "../../../utilities/regex";
import { userLoginBody } from "../interface/user.interface";
export const userLogWithOtpSchema = Joi.object<userLoginBody>({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(password_regex).required(),
  otp: Joi.string().required(),
});
