"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import LoaderSpinner from '@/components/LoaderSpinner';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EmptyState from '@/components/EmptyState';
import PodcastCard from '@/components/PodcastCard';
import { useAudio } from '@/providers/AudioProvider';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export default function Profile({ params: { profileId } }: { params: { profileId: string }}) {
  const user = useQuery(api.users.getUserById, { clerkId: profileId });
  const data = useQuery(api.podcasts.getPodcastByAuthorId, { authorId: profileId });
  const { setAudio } = useAudio();
  const [podcastNumber, setPodcastNumber] = useState(0);
  const { toast } = useToast();
  
  if (!user || !data) return <LoaderSpinner />;
  
    const playPodcast = () => {
      if (!data.podcasts || data.podcasts.length === 0) {
        toast({ title: "User has no podcasts to play", variant: "destructive" })
        return;
      };
      const podcast = data.podcasts[podcastNumber]
      setPodcastNumber(podcastNumber + 1 % data!.podcasts.length);
      setAudio({
        title: podcast.podcastTitle,
        audioUrl: podcast.audioUrl || "",
        imageUrl: podcast.imageUrl || "",
        author: podcast.author,
        podcastId: podcast._id,
      });
    };
  
  const { imageUrl, name } = user
  return (
    <section className="mt-9 flex flex-col">
        <h1 className="text-[20px] font-bold text-white-1 max-md:text-center">
          {name}&apos;s Channel
        </h1>
        <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
          <Image 
              src={imageUrl}
              alt="profile image"
              width={250}
              height={250}
              className="aspect-square rounded-lg"
            />
            <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
              <article className="flex flex-col gap-5 max-md:items-center mt-4">
                <div className='flex gap-2'>
                  <Image 
                    src='/icons/verified.svg'
                    width={20}
                    height={20}
                    alt='verified icon'
                  />
                  <span className='text-[14px] text-white-2'>
                    Verified Creator
                  </span>
                </div>
                <h1 className="text-[32px] font-extrabold tracking-[-0.32px] text-white-1">
                  {name}
                </h1>
                <div className='flex gap-3'>
                  <Image 
                    src="/icons/headphone.svg"
                    width={24}
                    height={24}
                    alt='headphones icon'
                  />
                  <h2 className='text-[16px] font-bold text-white-1'>
                    {data.listeners} &nbsp;
                    <span className='text-white-2 font-medium'>listeners</span>
                  </h2>
                </div>
                <Button
                  onClick={playPodcast}
                  className="text-[16px] py-4 max-w-[200px] bg-sakura-1 duration-500 hover:bg-sakura-2 font-extrabold text-white-1"
                >
                  <Image
                    src="/icons/Play.svg"
                    width={20}
                    height={20}
                    alt="random play"
                  />{" "}
                  &nbsp; Play a podcast
                </Button>
              </article>
            </div>
       </div>


      <div className="mt-9 flex flex-col gap-5">
       <h1 className="text-[20px] font-bold text-white-1">Podcasts by {name}</h1>
        {data.podcasts && data.podcasts.length > 0 ? (
            <div className='podcast_grid'>
              {data.podcasts.slice(0, 4).map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
              ))}
            </div>
          ): (
            <EmptyState
              title="You have not created any podcasts yet"
              buttonLink="/create-podcast"
              buttonText="Create Podcast"
            />
            )}
      </div>
    </section>
  )
}
