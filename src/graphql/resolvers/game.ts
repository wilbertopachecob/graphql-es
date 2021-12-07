import { IResolvers } from "@graphql-tools/utils";
import { Db, ObjectId } from "mongodb";

const gameResolver: IResolvers = {
  Query: {
    getGames: async (parent: void, args: any, context: Db) => {
      try {
        return await context.collection("games").find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addGame: async (parent: void, args: any, context: Db) => {
      try {
        await context.collection("games").insertOne(args.game);
        return "Game created successfully";
      } catch (error) {
        console.log(error);
        return "Error creating game";
      }
    },
  },
  Game: {
    developers: async (parent: any, args: any, context: Db) => {
      try {
        const developers = await context
          .collection("developers")
          .find({
            _id: {
              $in: parent.developers.map((_id: string) => new ObjectId(_id)),
            },
          })
          .toArray();
        return developers;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default gameResolver;
