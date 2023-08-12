import { merge } from "lodash";

import { authResolver } from "./auth/resolvers/auth.resolver";

const resolvers_arr = [authResolver];

export const resolver = merge(resolvers_arr);
