import CardList from '@/components/card/card-list';
import MainFilter from '@/components/filter/main-filter';
import { getCards } from '@/lib/card';

export default async function Home() {
  const cards = await getCards();

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <MainFilter cards={cards}/>
      <div className="flex flex-col gap-4"></div>
      <CardList cards={cards} />
    </main>
  );
}
