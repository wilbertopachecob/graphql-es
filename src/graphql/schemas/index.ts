import {
  loadSchemaSync,
  UnnormalizedTypeDefPointer,
} from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { GraphQLSchema } from "graphql";

const schemaNames = ["game", "character", "developer", "error", "simpleResponse"];

function createUnnormalizedTypeDefPointerArray(
  schemas: Array<string>
): UnnormalizedTypeDefPointer[] {
  return schemas.map((schemaName) => join(__dirname, `${schemaName}.graphql`));
}

const schema: GraphQLSchema = loadSchemaSync(
  createUnnormalizedTypeDefPointerArray(schemaNames),
  { loaders: [new GraphQLFileLoader()] }
);

export default schema;
