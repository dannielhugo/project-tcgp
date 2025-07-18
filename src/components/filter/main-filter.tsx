import Dropdown from '@/components/base/dropdown';
import { getPacks, getRarities, getTypes } from '@/lib/card';
import { Card } from '@/lib/types';

export default function MainFilter({ cards }: Readonly<{
  cards: Card[];
}>) {
  const rarities = getRarities(cards);
  const rarityOptions = rarities.map(rarity => ({
    label: rarity,
    value: rarity,
    checked: false,
  }));

  const packs = getPacks(cards);
  const packOptions = packs.map(pack => ({
    label: pack,
    value: pack,
    checked: false,
  }));

  const types = getTypes(cards);
  const typeOptions = types.map(type => ({
    label: type,
    value: type,
    checked: false,
  }));

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-white">Filter Cards</h2>
      <div className="flex flex-wrap gap-4">
        <Dropdown title="Rarity" options={rarityOptions} />
        <Dropdown title="Pack" options={packOptions} />
        <Dropdown title="Type" options={typeOptions} />
      </div>
    </div>
  );
}