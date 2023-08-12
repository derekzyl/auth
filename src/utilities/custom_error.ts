import { GraphQLError } from "graphql";
import { HTTP_RESPONSE } from "./http_response";
import { responseMessage } from "./response_message";

/* The `AppError` class is a custom error class in TypeScript that allows setting an error message and
status code. */
class AppError extends GraphQLError {
  statusCode!: number;

  /**
   * This is a constructor function for a custom error class in TypeScript that sets the error message
   * and status code.
   * @param {string} [message] - The `message` parameter is an optional string that represents the
   * error message. It is used to provide a custom error message when throwing an instance of this
   * error class.
   * @param {number} [status] - The `status` parameter is used to specify the HTTP status code for the
   * error. It is an optional parameter and if not provided, the default value is set to
   * `HTTP_RESPONSE.INTERNAL_SERVER_ERROR`.
   */
  constructor(message: string, status?: number) {
    super(message, { extensions: { statusCode: status } });
    //lets do some mongodb error management
    // if (message?.includes("E11000")) {
    //   this.message = "the data already exist in the database kindly check";
    // }
    Object.setPrototypeOf(this, new.target.prototype);
    this.stack = new Error().stack;

    if (message) {
      this.message = message;
    } else {
      this.message = "Something went wrong";
    }
    if (status) {
      this.statusCode = status;
    } else {
      this.statusCode = HTTP_RESPONSE.INTERNAL_SERVER_ERROR;
    }

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * APP ERROR
 *
 * -----------
 *
 * The function APP_ERROR creates a new instance of the AppError class with an optional status code and
 * returns it.
 * @param {string} message - A string that represents the error message. This message should provide
 * information about the error that occurred.
 * @param {number} [status] - The `status` parameter is an optional parameter that represents the HTTP
 * status code associated with the error. If provided, it will be used as the status code for the
 * error. If not provided, a default status code will be used.
 * @returns an instance of the `AppError` class with the provided `message` and `status` values.
 */
export function APP_ERROR(message: string, status?: number) {
  const my_error = new AppError(message, status);
  return responseMessage({
    success_status: false,
    message: "ERROR",
    data: { error: my_error.message },
    stack: my_error.stack,
  });
}
