import { APP_ERROR } from "../../../utilities/custom_error";
import { HTTP_RESPONSE } from "../../../utilities/http_response";
import { OneTimePassword } from "../../../utilities/otp";
import { qrCodeGen } from "../../../utilities/qr_code_gen";
import { USER } from "../model";

/**
 * Generate Qr Code
 *
 * ------------
 *
 * The function generates a QR code for a user's secret key used for two-factor authentication.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used to find the user in the database and perform operations on their account.
 * it saves the secret key in the users account
 * @returns The function `generateQrCode` returns the result of the `qrCodeGen` function, which
 * generates a QR code based on the `gen_key.otpauth_url` value.
 */
export const generateQrCode = async (id: string) => {
  const check_user = await USER.findById(id);

  if (!check_user)
    throw APP_ERROR(
      "user doesn't exist in database",
      HTTP_RESPONSE.BAD_REQUEST
    );
  const init_otp = new OneTimePassword();

  const gen_key = init_otp.generateOTP();

  check_user.secret_key = gen_key.base32;
  check_user.is_2fa_enabled = true;
  check_user.save();
  return qrCodeGen(gen_key.otpauth_url!);
};
