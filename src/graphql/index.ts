import { GraphQLSchema } from "graphql";
import "graphql-import-node";
import resolvers from "./resolvers";
import schema from "./schemas";
import { addResolversToSchema } from "@graphql-tools/schema";

export const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
  schema,
  resolvers,
});
