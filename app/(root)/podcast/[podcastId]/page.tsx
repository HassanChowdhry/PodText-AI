"use client";
import React from 'react'
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import PodcastPlayer from '@/components/PodcastPlayer';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import EmptyState from '@/components/EmptyState';
import { useUser } from '@clerk/nextjs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PodcastDetails ({ params }: { params: { podcastId: Id<"podcasts"> } }) {
  const { podcastId } = params;
  const { user } = useUser();
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId })
  const similar = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId })
  if (!similar || !podcast) {
    return (<LoaderSpinner />);
  }

  const isOwner = user?.id === podcast?.authorId;
  
  return (
    <section className='animate-fade-in flex w-full flex-col'>
      <header className='mt-9 flex items-center justify-between'>
        <h1 className='text-[20px] font-bold text-white-1'>Currently Playing</h1>
        <figure className='flex gap-3'>
          <Image 
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt='headphones icon'
          />
          <h2 className='text-[16px] font-bold text-white-1'>
            {podcast?.views}
          </h2>
        </figure>
      </header>
      
      <PodcastPlayer
        isOwner={isOwner}
        podcastId={podcast._id}
        {...podcast}
      />

      <p className='text-white-2 pb-8 text-[16px] pt-[45px] font-medium max-md:text-center'>
        {podcast?.podcastDescription}
      </p>

      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-[16px] text-white-1 font-bold'>Transcript</h1>
          <div className='text-[16px] font-medium text-white-2'>
              <Markdown
                  className="markdown"
                  remarkPlugins={[remarkGfm]}
              >
                  {podcast?.voicePrompt}
              </Markdown>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-[16px] text-white-1 font-bold'>Thumbnail Prompt</h1>
          <p className='text-[16px] font-medium text-white-2'>{podcast?.imagePrompt}</p>
        </div>

        <section className='mt-8 flex flex-col gap-5'>
          <h1 className='text-[20px] font-bold text-white-1'>Similar Podcasts</h1>
          {(similar && similar.length > 0) ? (
            <div className='podcast_grid'>
              {similar.map((podcast: any) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
              ))}
            </div>
          ) : (
            <EmptyState
              title='No similar podcasts found'
              buttonLink='/discover'
              buttonText='Discover More Podcasts'
            />
          )}
        </section>

      </div>
    </section>
  );
};
