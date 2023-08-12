import {
  changePassword,
  generateQrCode,
  login,
  protector,
  register,
} from "./services";
import { loginWithOtp } from "./services/login_with_otp.services";

export class Auth {
  public generate_qr_code = generateQrCode;
  public login = login;
  public register = register;
  public change_password = changePassword;
  public protector = protector;
  public login_with_otp = loginWithOtp;
}
