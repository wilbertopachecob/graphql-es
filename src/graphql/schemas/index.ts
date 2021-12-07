import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

const schema = loadSchemaSync(
  [
    join(__dirname, "game.graphql"),
    join(__dirname, "character.graphql"),
    join(__dirname, "developer.graphql"),
  ],
  { loaders: [new GraphQLFileLoader()] }
);

export default schema;
