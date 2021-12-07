import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Db } from "mongodb";

const characterResolver: IResolvers = {
  Query: {
    async getCharacters(parent: void, args: any, context: Db) {
      try {
        const characters = await context
          .collection("characters")
          .find()
          .toArray();
        return characters;
      } catch (error) {
        console.log(error);
      }
    },
    getCharacter: async (parent: void, args: any, context: Db) => {
      try {
        const character = await context
          .collection("characters")
          .findOne({ _id: new ObjectId(args._id) });
        return character;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async addCharacter(parent: void, { character }: any, context: Db) {
      try {
        await context.collection("characters").insertOne(character);
        return "The character was successfuly added";
      } catch (error) {
        console.log(error);
        return "Error inserting character in the Database";
      }
    },
    async editCharacter(parent: void, { character, _id }: any, context: Db) {
      try {
        await context
          .collection("characters")
          .updateOne({ _id: new ObjectId(_id) }, { $set: character });
        return "The character was successfuly added";
      } catch (error) {
        console.log(error);
        return "Error inserting character in the Database";
      }
    },
  },
  Character: {
    games: async (parent: any, args: any, context: Db) => {
      try {
        const games = await context
          .collection("games")
          .find({
            _id: {
              $in: parent.games.map((_id: string) => new ObjectId(_id)),
            },
          })
          .toArray();
        return games;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default characterResolver;
