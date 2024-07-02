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
import { useRouter } from 'next/navigation';

const RightNavbar = () => {
  const { user }= useUser();
  const podcasts = useQuery(api.podcasts.getPodcasts, {num_res: 4})
  const users = useQuery(api.users.getTopUserByPodcastCount, {num_res: 4})
  const router = useRouter();
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

      <section className='flex flex-col gap-8 pt-12'>
        <Header headerTitle='Top Podcast Channels' />
        <div className='flex flex-col gap-6'>
          {users && users.map(({ clerkId, imageUrl, name, totalPodcasts }, index) => (
            <div
              key={clerkId}
              className='flex justify-between cursor-pointer'
              onClick={() => router.push(`/profile/${clerkId}`)}
            >
              <figure className='flex items-center gap-2'>
                <Image 
                  src={imageUrl}
                  width={40}
                  height={40}
                  alt='podcast'
                  className='aspect-sqaure rounded-lg'
                />
                <h2 className='text-[16px] text-white-1 font-semibold'>
                  {name}
                </h2>
              </figure>
              <div className='flex items-center'>
                <p className='text-[12px] font-normal'>
                  {totalPodcasts} Podcasts
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </section>
  );
};

export default RightNavbar;