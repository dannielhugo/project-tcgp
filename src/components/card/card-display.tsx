import { Card } from '@/lib/types';
import Image from 'next/image';

export default function CardDisplay({  card,
}: Readonly<{
  card: Card;
}>) {
  return (
    <div className="card bg-white shadow-md rounded-lg p-4">
      <Image src={card.image} alt={card.name} className="w-full h-auto" width={367} height={512}/>
      <h2 className="text-xl font-bold mt-2 text-sky-950">{card.name}</h2>
      <p className="text-gray-600">Rarity: {card.rarity}</p>
      <p className="text-gray-600">Pack: {card.pack}</p>
    </div>
  );
}