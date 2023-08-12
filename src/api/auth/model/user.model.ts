import { Schema, model } from "mongoose";
import { UserDoc } from "../interface/user.interface";
import { email_regex } from "../../../utilities/regex";
import { time_stamps } from "../../../utilities/timestamp";

const userSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: (data: string) => email_regex.test(data),
        message: ({ value }: { value: string }) =>
          `${value} is not a phone number`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    is_email_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    secret_key: {
      type: String,
    },
    password_changed_at: { type: Date },
    token: {
      type: String,
    },
    token_expires: { type: Date },
    is_2fa_enabled: { type: Boolean },
  },
  { timestamps: time_stamps }
);

/* The line `const USER = model("USER", userSchema);` is creating a Mongoose model named "USER" based
on the userSchema. This model will be used to interact with the "users" collection in the MongoDB
database. */
export const USER = model("USER", userSchema);
