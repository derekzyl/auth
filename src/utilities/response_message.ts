import * as dotenv from "dotenv";
import { customMessageI } from "./interface/response_message.interface";

dotenv.config();

/**
 * Response Message
 *
 * -------------
 *
 * The function `responseMessage` takes in a custom message object and returns a response object based
 * on the success status of the message.
 * @param {customMessageI} msg - The `msg` parameter is an object that represents a custom message. It
 * has the following properties:
 * @returns The function `responseMessage` returns an object with different properties based on the
 * value of `msg.success_status`.
 */
export function responseMessage(msg: customMessageI) {
  switch (msg.success_status) {
    case true:
      return {
        message: msg.message,
        data: msg.data,
        success: msg.success_status,
        doc_length: msg.doc_length,
      };

    case false:
      return {
        message: msg.message,
        error: msg.data,
        success: msg.success_status,
        stack: process.env.NODE_ENV === "development" ? msg.stack : {},
      };
    default:
      break;
  }
}
