import { Card } from '@/lib/types';

export async function getCards(): Promise<Card[]> {
  const res = await fetch('https://raw.githubusercontent.com/chase-manning/pokemon-tcg-pocket-cards/refs/heads/main/v4.json');

  if (!res.ok) {
    throw new Error("Failed to fetch cards");
  }

  return await res.json();
}

export function getPacks(cards: Card[]): string[] {
  const packs = new Set<string>();

  cards.forEach(card => {
    if (card.pack) {
      packs.add(card.pack);
    }
  });

  return Array.from(packs).sort();
}

export function getRarities(cards: Card[]): string[] {
  const rarities = new Set<string>();

  cards.forEach(card => {
    if (card.rarity) {
      rarities.add(card.rarity);
    }
  });

  return Array.from(rarities).sort();
}

export function getTypes(cards: Card[]): string[] {
  const types = new Set<string>();

  cards.forEach((card) => {
    if (card.type) {
      types.add(card.type);
    }
  });

  return Array.from(types).sort();
}


export function filterExCards(cards: Card[]): Card[] {
  const exCards = cards.filter(card => card.ex === "Yes");
  return exCards;
}

export function filterCardsByPack(cards: Card[], pack: string): Card[] {
  return cards.filter(card => card.pack === pack);
}

export function filterCardsByRarity(cards: Card[], rarity: string): Card[] {
  return cards.filter(card => card.rarity === rarity);
}