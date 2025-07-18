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
  userId: number;
  owner: User;
}

export interface User {
  id: string;
  cards: Card[];
}
