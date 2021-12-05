import { mergeResolvers } from "@graphql-tools/merge";
import characterResolver from "./character";
import gameResolver from "./game";

const resolvers = [characterResolver, gameResolver]

export default mergeResolvers(resolvers);