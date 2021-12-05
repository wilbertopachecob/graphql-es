import { IResolvers } from "@graphql-tools/utils";

const characterResolver: IResolvers = {
  Query: {
    hello: () => "world",
    getCharacters: () => [
      {
        id: 1,
        name: "Link",
        race: 'HYLIAN',
      },
      {
        id: 2,
        name: "Zelda",
        race: 'HYLIAN',
      },
    ],
  },
};

export default characterResolver;
