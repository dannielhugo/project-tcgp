import { auth0 } from '@/lib/auth0';
import Link from 'next/link';

export default async function NavBar() {
  const session = await auth0.getSession();
  const user = session?.user || null;
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold hover:underline">
        TCGP Collection
      </Link>
      <div className="flex space-x-4">
        <Link href="/profile" className="hover:underline">Profile</Link>
        {user && <Link href="/auth/logout" className="hover:underline">Logout</Link>}
        {!user && <Link href="/auth/login" className="flex items-center gap-2">Sign up</Link>}
      </div>
    </nav>
  );
}