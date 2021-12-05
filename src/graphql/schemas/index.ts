import character from "./character.graphql";
import game from "./game.graphql";

import { makeExecutableSchema } from "graphql-tools";
import { DocumentNode, GraphQLSchema } from "graphql";

function generateSchemas(schemas: Array<DocumentNode>): Array<GraphQLSchema> {
  return schemas.map((schema) =>
    makeExecutableSchema({
      typeDefs: schema,
    })
  );
}

const schemes = generateSchemas([character, game]);

export default schemes;
