import character from "./character.graphql";
import game from "./game.graphql";
import developer from "./developer.graphql";

import { makeExecutableSchema } from "graphql-tools";
import { DocumentNode, GraphQLSchema } from "graphql";

function generateSchemas(schemas: Array<DocumentNode>): Array<GraphQLSchema> {
  return schemas.map((schema) =>
    makeExecutableSchema({
      typeDefs: schema,
    })
  );
}

const schemes = generateSchemas([character, game, developer]);

export default schemes;
