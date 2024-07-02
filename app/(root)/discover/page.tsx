"use client";

import EmptyState from '@/components/EmptyState';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import SearchBar from '@/components/SearchBar';

const Discover = ({ searchParams: { search } }: {searchParams: { search: string }}) => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: search || "" })
  return (
    <div className='flex flex-col gap-9'>
      <SearchBar />
      
      <div className='flex flex-col gap-9'>
        <h1 className='text-[20px] font-bold text-white-1'>
         {!search ?  'Discover Podcasts' : `Search results for `}
         {search && <span className='text-white-2' >{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className='podcast_grid'>
                {podcastsData.map((podcast: any) => (
                  <PodcastCard key={podcast._id} podcast={podcast} />
                ))}
              </div>
          ) : <EmptyState title='No podcasts found' buttonLink={''} buttonText={''} />}
          </>
        ): <LoaderSpinner />}

      </div>
    </div>
  );
};

export default Discover;