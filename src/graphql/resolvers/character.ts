import { IResolvers } from "@graphql-tools/utils";
import data from "../../data/data.json";

const characterResolver: IResolvers = {
  Query: {
    getCharacters: () => data.characters,
  },
  Character: {
    games: (parent: any) =>
      data.games.filter(({ _id }: { _id: string }) =>
        parent.games.includes(_id)
      ),
  },
};

export default characterResolver;
