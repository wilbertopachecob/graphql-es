import { mergeResolvers } from "@graphql-tools/merge";
import characterResolver from "./character";
import gameResolver from "./game";
import developerResolver from "./developer";

const resolvers = [characterResolver, gameResolver, developerResolver];

export default mergeResolvers(resolvers);
