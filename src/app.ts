/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from "@apollo/server";
import { resolver } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typedefs";

export const server = new ApolloServer({ typeDefs, resolvers: resolver });
