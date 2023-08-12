import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { LoggerTypeE, logger } from "./utilities/logger";

export function startDb() {
  dotenv.config();

  const db = `${process.env.MONGODB}`;
  mongoose.connect(db);
  mongoose.connection.on("connected", () =>
    logger.log(LoggerTypeE.INFO, "database securely connected  🍀🍀🍀 ")
  );
  mongoose.connection.on("disconnected", () => {
    logger.log(LoggerTypeE.ERROR, "database not connected 💔💔");
    process.exit(1);
  });
}
