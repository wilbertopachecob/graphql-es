import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IDeveloper } from "../../interfaces/IDeveloper";
import { isNull, isString } from "lodash";

const developerResolver: IResolvers = {
  Query: {
    getDevelopers: async (parent: void, args: void, context: Db) => {
      try {
        const developers = await context
          .collection("developers")
          .find()
          .toArray();
        return developers;
      } catch (error) {
        console.log(error);
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
          .collection("characters")
          .findOne({ name: developer.name });
        if (!isNull(exist)) {
          await context.collection("developers").insertOne(developer);
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
};

export default developerResolver;
