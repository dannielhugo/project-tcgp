export interface Card {
  id: string;
  name: string;
  rarity: string;
  pack: string;
  health: string;
  image: string;
  fullart: string;
  ex: string;
  artist: string;
  type: string;
  author: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Card[];
}
