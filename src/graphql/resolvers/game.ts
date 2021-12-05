import { IResolvers } from "@graphql-tools/utils";

const gameResolver: IResolvers = {
  Query: {
    gameHello: () => "hello game",
  },
};

export default gameResolver;