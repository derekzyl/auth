import { USER } from "../model";

export async function getUser() {
  const f = await USER.find();
  return f;
}
