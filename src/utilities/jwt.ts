/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class JWT {
  private static secret: string =
    process.env.JWT_SECRET ?? "this might be the string but it isnt secured";
  /**
   * The function generates a JSON Web Token (JWT) using a payload and optional options.
   * @param {string | Record<string, string>} payload - The payload parameter is the data that you want
   * to include in the token. It can be a string or an object containing key-value pairs. This data
   * will be encoded into the token and can be accessed later when the token is decoded.
   * @param [options] - The `options` parameter is an optional parameter that allows you to specify
   * additional options for generating the token. It is of type `jwt.SignOptions`, which is an
   * interface provided by the `jsonwebtoken` library.
   * @returns a string.
   */
  public static generateToken(
    payload: string | Record<string, string>,
    options?: jwt.SignOptions
  ): string {
    return jwt.sign(payload, this.secret, options);
  }

  /**
   * The function `verifyToken` verifies a JWT token using a secret and optional options.
   * @param {string} token - The token parameter is a string that represents the JWT token that needs
   * to be verified.
   * @param [options] - The `options` parameter is an optional object that can be used to specify
   * additional options for verifying the token. It can include properties such as `algorithms`,
   * `audience`, `issuer`, `ignoreExpiration`, `clockTolerance`, `maxAge`, `clockTimestamp`, `nonce`, `
   * @returns either the JwtPayload or a string.
   */
  public static verifyToken(
    token: string,

    options?: jwt.VerifyOptions
  ): any {
    return jwt.verify(token, this.secret, options);
  }
}
export default JWT;
