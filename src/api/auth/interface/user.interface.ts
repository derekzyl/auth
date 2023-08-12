import { Document } from "mongoose";

/* The `export interface UserI {` is defining an interface named `UserI`. This interface specifies the
structure of a user object, including properties such as `email`, `password`, `is_email_verified`,
`secret_key`, `token`, `token_expires`, `password_changed_at`, `is_deleted`, and `is_2fa_enabled`.
These properties define the shape of a user object and their respective data types. */
export interface UserI {
  email: string;
  password: string;
  is_email_verified?: boolean;
  secret_key: string;
  token?: string;
  token_expires?: Date;
  password_changed_at?: Date;
  is_deleted?: boolean;
  is_2fa_enabled: boolean;
}

/* The line `export interface UserDoc extends UserI, Document {}` is creating an interface named
`UserDoc` that extends both the `UserI` interface and the `Document` interface from the `mongoose`
library. */
export interface UserDoc extends UserI, Document {}

/**
 * The above type represents the body of a user registration request, containing an email and password.
 * @property {string} email - A string representing the email address of the user. This is used for
 * user identification and communication purposes.
 * @property {string} password - A string that represents the user's password.
 */
/**
 * The above type represents the body of a user registration request, containing an email and password.
 * @property {string} email - A string representing the email address of the user. This is used for
 * identification and communication purposes.
 * @property {string} password - The `password` property is a string that represents the user's
 * password.
 */
export type userRegisterBody = {
  email: string;
  password: string;
};

/**
 * The above type represents the body of a user login request, including email, password, and otp.
 * @property {string} email - A string representing the user's email address.
 * @property {string} password - The `password` property is a string that represents the user's
 * password.
 * @property {string} otp - The "otp" property stands for "One-Time Password". It is a unique code that
 * is generated and sent to the user's email or phone number for authentication purposes. The user
 * needs to enter this code along with their email and password to complete the login process.
 */
export type userLoginBody = {
  email: string;
  password: string;
  otp: string;
};
/**
 * The above type represents the body of a request to change a user's password, including the user's
 * ID, current password, and new password.
 * @property {string} id - A string representing the user's ID or unique identifier.
 * @property {string} password - The current password of the user.
 * @property {string} new_password - The `new_password` property is a string that represents the new
 * password that the user wants to set.
 */
export type userChangePasswordBody = {
  id: string;
  password: string;
  new_password: string;
};
