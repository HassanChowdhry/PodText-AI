"use client";

import React from 'react';  
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';

export const links = [
  {
    route: '/',
    label: 'Home',
    imageURL: '/icons/home.svg'
  },
  {
    route: '/discover',
    label: 'Discover',
    imageURL: '/icons/discover.svg'
  },
  {
    route: '/create-podcast',
    label: 'Create Podcast',
    imageURL: '/icons/microphone.svg'
  },
  {
    route: '/profile',
    label: 'My Profile',
    imageURL: '/icons/profile.svg'
  },
];

const LeftNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user }= useUser();
  const Id = user?.id;

  return (
    <section className='left_sidebar'>
      <nav className='flex flex-col'>
        <Link href="/" className='flex items-center gap-3 pb-10 max-lg:justify-center'>
          <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
          <h1 className='text-[24px] font-extrabold text-white-1 max-lg:hidden'> PodText AI </h1>
        </Link>

        {links.map(({ route, label, imageURL }, index) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link 
              className={`${isActive && "bg-nav-focus border-r-4 border-sakura-1"} 
                flex gap-3 py-6 items-center max-lg:px-4 justify-center lg:justify-start`}
              href={route==="/profile" ? `/profile/${Id}` : route}
              key={label}>
              <Image src={imageURL} alt={label} width={30} height={30} />
              <p>{label}</p>
            </Link>
          )
        })}
      </nav>

      <SignedOut>
        <div className='flex-center w-full pb-10 lg:pr-8 max-lg:px-4'>
          <Button 
            onClick={() => router.push('/sign-in')}
            className='bg-sakura-1 w-full text-[16px] font-bold'>
            Sign In
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className='flex-center w-full pb-10 lg:pr-8 max-lg:px-4'>
          <Button 
            onClick={() => signOut(() => router.push('/'))}
            className='bg-sakura-1 hover:bg-sakura-2 duration-500 w-full text-[16px] font-bold'>
            Sign Out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftNavbar;