export interface ICharacter {
  _id: string;
  name: string;
  race: Race;
  genre: Genre;
  games: Array<string>;
  image: string;
}

enum Race {
  HYLIAN,
  GERUDO,
  FAIRY,
  MONSTER,
}

enum Genre {
  MALE,
  FEMALE,
}
