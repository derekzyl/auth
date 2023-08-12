import { server } from "./src/app";
import { startDb } from "./src/db";
import { startStandaloneServer } from "@apollo/server/standalone";

import { LoggerTypeE, logger } from "./src/utilities/logger";
import * as dotenv from "dotenv";
import { Auth } from "./src/api/auth";
// import { APP_ERROR } from "./src/utilities/custom_error";
// import { UserI } from "./src/api/auth/interface/user.interface";
dotenv.config();
const get_auth = new Auth();

const port: number = Number(process.env.PORT) ?? 6000;
startStandaloneServer(server, {
  listen: { port: port },

  context: async ({ req }) => ({
    user: await get_auth.protector(req.headers.authorization!),
  }),
})
  .then(({ url }) => {
    logger.log(LoggerTypeE.INFO, ` server connected succssfully: ${url}`);
  })
  .catch(() => {
    logger.error("Error starting server");
  });
startDb();
