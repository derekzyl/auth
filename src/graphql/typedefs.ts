import { mergeTypeDefs } from "@graphql-tools/merge";
import { readFileSync } from "fs";
import { join } from "path";

const filePath = join(__dirname, "auth", "schema", "auth.schema.graphql");
const auth_schema = readFileSync(filePath, { encoding: "utf8" });
const schema_arr = [auth_schema];
export const typeDefs = mergeTypeDefs(schema_arr);
