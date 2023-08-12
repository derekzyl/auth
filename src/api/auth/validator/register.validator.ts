import Joi from "joi";
import { password_regex } from "../../../utilities/regex";
import { userRegisterBody } from "../interface/user.interface";
export const userRegSchema = Joi.object<userRegisterBody>({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(password_regex).required(),
});
