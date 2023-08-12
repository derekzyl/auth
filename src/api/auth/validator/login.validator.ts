import Joi from "joi";
import { password_regex } from "../../../utilities/regex";
import { userLoginBody } from "../interface/user.interface";
export const userLogSchema = Joi.object<Omit<userLoginBody, "otp">>({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(password_regex).required(),
});
