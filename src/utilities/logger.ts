import { format, transports, createLogger } from "winston";
const { timestamp, printf, combine, colorize } = format;

/* The `export enum LoggerTypeE` is defining an enumeration in TypeScript. It is creating a named set
of constants that represent different log levels for the logger. Each constant in the enumeration
has a string value associated with it. In this case, the log levels are "error", "warn", "info",
"http", "verbose", "debug", and "silly". */
export enum LoggerTypeE {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  HTTP = "http",
  VERBOSE = "verbose",
  DEBUG = "debug",
  SILLY = "silly",
}

/* The code is creating a logger object using the `createLogger` function from the `winston` library.
The logger object is configured with the following options: */
export const logger = createLogger({
  // Log only if level is less than (meaning more severe) or equal to this
  level: "info",
  // Use timestamp and printf to create a standard log format
  format: combine(
    timestamp(),
    colorize({ all: true }),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  // Log to the console and a file
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
});
