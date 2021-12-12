import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IDeveloper } from "../../interfaces/IDeveloper";
import { has, isNull, isString } from "lodash";
import { COLLECTION_NAMES } from "../../database/collectionNames";

const developerResolver: IResolvers = {
  Query: {
    getDevelopers: async (parent: void, args: void, context: Db) => {
      try {
        const developers = await context
          .collection(COLLECTION_NAMES.DEVELOPERS)
          .find()
          .toArray();
        return { developers };
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
  Mutation: {
    addDeveloper: async (
      parent: any,
      { developer }: { developer: Omit<IDeveloper, "_id"> },
      context: Db
    ) => {
      try {
        const exist = await context
          .collection(COLLECTION_NAMES.DEVELOPERS)
          .findOne({ name: developer.name });
        if (isNull(exist)) {
          await context
            .collection(COLLECTION_NAMES.DEVELOPERS)
            .insertOne(developer);
          return "Developer added successfully";
        }
        throw new Error("The developer already exists");
      } catch (error: any) {
        console.log(error);
        let msg = "Error creating developer";
        if (error.message && isString(error.message)) {
          msg = error.message;
        }
        return msg;
      }
    },
  },
  GetDevelopersResponse: {
    __resolveType(obj: any) {
      return obj.developers ? "GetDevelopersSuccess" : "Error";
    },
  },
  AddDeveloperResponse: {
    __resolveType(obj: any) {
      return !has(obj, 'stack') ? "SimpleResponse" : "Error";
    },
  }
};

export default developerResolver;
