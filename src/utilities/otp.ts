import speakeasy, { GeneratedSecret } from "speakeasy";

export class OneTimePassword {
  /**
   * The function generates a one-time password (OTP) using the speakeasy library in TypeScript.
   * @returns a generated secret.
   */
  public generateOTP(): GeneratedSecret {
    const secret = speakeasy.generateSecret();
    return secret;
  }

  /**
   * verifyOTP
   *
   * ----------
   *
   * The function `verifyOTP` takes a secret key and a token as input and verifies if the token is
   * valid for the given secret key using the speakeasy library.
   * @param  - - `secret_key`: A string representing the secret key used to generate the OTP.
   * @returns a boolean value indicating whether the provided token is valid for the given secret key.
   */
  public verifyOTP({
    secret_key,
    token,
  }: {
    secret_key: string;
    token: string;
  }): boolean {
    const verify: boolean = speakeasy.totp.verify({
      secret: secret_key,
      token: token,
      encoding: "base32",
    });
    return verify;
  }
}
