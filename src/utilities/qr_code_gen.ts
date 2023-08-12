import qrcode from "qrcode";

/**
 * Qr code Generator
 *
 * -----------
 *
 * The function `qrCodeGen` generates a QR code image in the form of a data URL based on the provided
 * data.
 * @param {string} data - The `data` parameter is a string that represents the data that you want to
 * encode into a QR code. This can be any type of data such as a URL, text, or any other information
 * that you want to encode.
 * @returns The function `qrCodeGen` returns a QR code generated from the input data as a data URL.
 */
export const qrCodeGen = (data: string) => {
  const qrCode = qrcode.toDataURL(data);
  return qrCode;
};
