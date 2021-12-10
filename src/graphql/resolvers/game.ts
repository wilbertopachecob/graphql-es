import { IResolvers } from "@graphql-tools/utils";
import { Db, ObjectId } from "mongodb";
import { IGame } from "../../interfaces/IGame";
import { isNull, isString } from "lodash";
import { COLLECTION_NAMES } from "../../database/collectionNames";

const gameResolver: IResolvers = {
  Query: {
    getGames: async (parent: void, args: void, context: Db) => {
      try {
        const games = await context
          .collection(COLLECTION_NAMES.GAMES)
          .find()
          .toArray();
        return { games };
      } catch (error: any) {
        console.log(error);
        let e = {
          message: error.message || "Error getting games from the database",
          stack: error.stack || "",
        };
        return e;
      }
    },
  },
  Mutation: {
    addGame: async (
      parent: void,
      { game }: { game: Omit<IGame, "_id"> },
      context: Db
    ) => {
      try {
        const exists = await context
          .collection(COLLECTION_NAMES.GAMES)
          .findOne({ title: game.title });

        if (isNull(exists)) {
          await context.collection(COLLECTION_NAMES.GAMES).insertOne(game);
          return { message: "Game created successfully" };
        }
        throw new Error(`A game with title: ${game.title} already exists`);
      } catch (error: any) {
        console.log(error);
        let e = {
          message: error.message || "Error inserting game into database",
          stack: error.stack || "",
        };
        return e;
      }
    },
  },
  Game: {
    developers: async (parent: any, args: void, context: Db) => {
      try {
        const developers = await context
          .collection(COLLECTION_NAMES.DEVELOPERS)
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
  AddGameResponse: {
    __resolveType(obj: any) {
      return isString(obj) ? "SimpleResponse" : "Error";
    },
  },
  GetGamesResponse: {
    __resolveType(obj: any) {
      return obj.games ? "GetGamesSuccess" : "Error";
    },
  },
};

export default gameResolver;
