'use client';
import { useUser } from "@auth0/nextjs-auth0";
import Image from 'next/image';

export default function Profile() {
  const { user, isLoading } = useUser();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {user && (
        <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
          {user.picture && (
            <div className='relative size-32 md:size-32'>
              <Image
                className="size-48 shadow-xl rounded-md"
                src={user.picture!}
                alt="Profile"
                fill
              />
            </div>
          )}
          
          <div className="flex items-center md:items-start md:flex-col">
            <span className="text-2xl font-medium">{user.name}</span>
            <span className="font-medium text-sky-500">{user.email}</span>
          </div>
        </div>
      )}
    </>
  );
}