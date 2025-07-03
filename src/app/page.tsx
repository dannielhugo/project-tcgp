import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Link href="/auth/login" className="flex items-center gap-2">
        <span className="text-lg font-semibold">Login with Auth0</span>
      </Link>
    </main>
  );
}
