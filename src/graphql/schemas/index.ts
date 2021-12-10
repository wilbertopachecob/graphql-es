import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { GraphQLSchema } from "graphql";

const schemas = ["game", "character", "developer", "error", "simpleResponse"];

function createUnnormalizedTypeDefPointerArray(schemas: Array<string>) {
  return schemas.map((schemaName) => join(__dirname, `${schemaName}.graphql`));
}

const schema: GraphQLSchema = loadSchemaSync(
  createUnnormalizedTypeDefPointerArray(schemas),
  { loaders: [new GraphQLFileLoader()] }
);

export default schema;
