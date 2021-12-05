import { GraphQLSchema } from "graphql";
import "graphql-import-node";
import resolvers from "./resolvers";
import { mergeSchemas } from "@graphql-tools/schema";
import schemas from "./schemas";

export const schema: GraphQLSchema = mergeSchemas({
  schemas,
  resolvers,
});
