import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";

const developerResolver: IResolvers = {
  Query: {
    getDevelopers: async (parent: any, args: any, context: Db) => {
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
    addDeveloper: async (parent: any, args: any, context: Db) => {
      try {
        await context.collection("developers").insertOne(args.developer);
        return "Developer added successfuly";
      } catch (error) {
        console.log(error);
        return "Error creating developer";
      }
    },
  },
};

export default developerResolver;
