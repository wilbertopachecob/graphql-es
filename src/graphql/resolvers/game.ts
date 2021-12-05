import { IResolvers } from "@graphql-tools/utils";
import data from "../../data/data.json";

const gameResolver: IResolvers = {
  Query: {
    getGames: () => data.games,
  },
};

export default gameResolver;
