import CardDisplay from '@/components/card/card-display';
import { Card } from '@/lib/types';

export default function CardList({
  cards,
}: Readonly<{
  cards: Card[];
}>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {cards.map((card) => <CardDisplay key={card.id} card={card} />)}
    </div>
  );
}