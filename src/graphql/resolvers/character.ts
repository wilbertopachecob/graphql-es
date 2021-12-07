import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Db } from "mongodb";
import data from "../../data/data.json";

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
  },
  Character: {
    games: (parent: any) =>
      data.games.filter(({ _id }: { _id: string }) =>
        parent.games.includes(_id)
      ),
  },
};

export default characterResolver;
