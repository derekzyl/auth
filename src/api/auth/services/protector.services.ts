import JWT from "../../../utilities/jwt";

import { USER } from "../model";
import { APP_ERROR } from "../../../utilities/custom_error";

export const protector = async (token: string) => {
  let toke = token;

  if (token && token.startsWith("Bearer")) {
    toke = token.slice("Bearer".length).trim();

    // 1) we decode the token to get the user id

    const decode = JWT.verifyToken(toke);

    const user_id = decode.id;
    const get_user = await USER.findById(user_id);
    if (!get_user) throw APP_ERROR("something definitely went wrong");
    return get_user;
  } else return {};
};
