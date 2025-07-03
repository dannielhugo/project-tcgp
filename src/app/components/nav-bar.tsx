import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold hover:underline">
        TCGP Collection
      </Link>
      <div className="flex space-x-4">
        <Link href="/profile" className="hover:underline">Profile</Link>
        <Link href="/auth/logout" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
}