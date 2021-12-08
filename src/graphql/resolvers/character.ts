import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Db } from "mongodb";
import { ICharacter } from "../../interfaces/ICharacter";
import { isNull, isString } from "lodash";

const characterResolver: IResolvers = {
  Query: {
    async getCharacters(parent: void, args: void, context: Db) {
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
    getCharacter: async (
      parent: void,
      { _id }: { _id: string },
      context: Db
    ) => {
      try {
        const character = await context
          .collection("characters")
          .findOne({ _id: new ObjectId(_id) });
        return character;
      } catch (error: any) {
        console.error(error);
        let e = {
          message: error.message || 'Error getting character from database',
          stack: error.stack || ''
        }
        return e;
      }
    },
  },
  Mutation: {
    async addCharacter(
      parent: void,
      { character }: { character: Omit<ICharacter, "_id"> },
      context: Db
    ) {
      try {
        const exist = await context
          .collection("characters")
          .findOne({ name: character.name });
        if (!isNull(exist)) {
          await context.collection("characters").insertOne(character);
          return "The character was successfuly added";
        }
        throw new Error("The character already exists");
      } catch (error: any) {
        console.log(error);
        let msg = "Error inserting character in the Database";
        if (error.message && isString(error.message)) {
          msg = error.message;
        }
        return msg;
      }
    },
    async editCharacter(
      parent: void,
      { character, _id }: { character: ICharacter; _id: string },
      context: Db
    ) {
      try {
        await context
          .collection("characters")
          .updateOne({ _id: new ObjectId(_id) }, { $set: character });
        return "The character was successfuly added";
      } catch (error: any) {
        console.log(error);
        let msg = "Error editing character in the Database";
        if (error.message && isString(error.message)) {
          msg = error.message;
        }
        return msg;
      }
    },
  },
  Character: {
    games: async (parent: ICharacter, args: void, context: Db) => {
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
  GetCharacterResponse: {
    __resolveType(obj: any) {
      return obj._id ? "Character" : "Error";
    },
  },
};

export default characterResolver;
