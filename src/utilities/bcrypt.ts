import bcrypt from "bcrypt";
/* The BCRYPT class provides methods for hashing and comparing passwords using bcrypt. */
class BCRYPT {
  /**
   * The function takes a password as input, generates a salt using bcrypt, and then hashes the
   * password using the generated salt.
   * @param {string} password - The `password` parameter is a string that represents the password that
   * needs to be hashed.
   * @returns a Promise that resolves to a string.
   */
  static async hash(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  /**
   * The function compares a password with its corresponding hash value and returns a boolean
   * indicating whether they match.
   * @param {string} password - The `password` parameter is a string that represents the plain text
   * password that you want to compare with the hashed password.
   * @param {string} hash - The `hash` parameter is a string that represents the hashed version of a
   * password. It is typically generated using a hashing algorithm like bcrypt.
   * @returns a Promise that resolves to a boolean value.
   */
  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
export default BCRYPT;
