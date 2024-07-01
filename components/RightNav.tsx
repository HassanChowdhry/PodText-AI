"use client";

import React from 'react';  
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import Header from './Header';
import EmblaCarousel from './EmblaCarousel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const RightNavbar = () => {
  const { user }= useUser();
  const podcasts = useQuery(api.podcasts.getPodcasts)
  return (
    <section className='right_sidebar text-white-1'>
      <SignedIn>
        <Link 
          href={`/profile/${user?.id}`}
          className='flex gap-3 pb-12'
        >
          <UserButton />
          <div className='flex w-full items-center justify-between'>
            <h1 className='text-[16px] truncate font-semibold text-white-1'>
              {user?.firstName} {user?.lastName}
            </h1>
            <Image src="/icons/right-arrow.svg" width={24} height={24} alt=''/>
          </div>
        </Link>
      </SignedIn>
      <div>
        <Header headerTitle='Listeners also like this' />
        <EmblaCarousel podcasts={podcasts} />
      </div>
    </section>
  );
};

export default RightNavbar;