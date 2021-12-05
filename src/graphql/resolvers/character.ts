import { IResolvers } from "@graphql-tools/utils";
import data from "../../data/data.json";

const characterResolver: IResolvers = {
  Query: {
    getCharacters: () => data.characters,
    getCharacter: (parent: void, args: any) =>
      data.characters.find((character) => character._id === args._id),
  },
  Mutation: {
    addCharacter(parent: void, { character }: any) {
      const _id = `${data.characters.length + 1}`;
      data.characters.push({ _id, ...character });

      return "The character was successfuly added";
    },
  },
  Character: {
    games: (parent: any) =>
      data.games.filter(({ _id }: { _id: string }) =>
        parent.games.includes(_id)
      ),
  },
};

export default characterResolver;
