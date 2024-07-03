import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Podcast = {
  _id: Id<"podcasts">;
  podcastTitle: string;
  podcastDescription: string;
  imageUrl: string;
};

type PodcastCardProps = {
  podcast: Podcast;
};

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const router = useRouter()
  const updateListens = useMutation(api.podcasts.updatePodcastViews);

  const handleViewsPodcast = () => {
    updateListens({
      podcastId: podcast._id,
    });
    router.push(`/podcast/${podcast._id}`, {
      scroll: true,
    });
  }
  return (
    <div 
      className='hover:scale-105 ease-in-out duration-200 cursor-pointer text-white-1' 
      onClick={handleViewsPodcast}>
      <figure className='flex flex-col gap-2'>
        <Image className='h-fit w-full rounded-xl 2xl:size-[200px]' src={podcast.imageUrl} alt={podcast.podcastTitle} width={175} height={175}/>
        <div className='flex flex-col'>
          <h1 className='text-[16px] truncate font-bold'>{podcast.podcastTitle}</h1>
          <h2 className='text-[12px] truncate capitalize text-white-4'>{podcast.podcastDescription}</h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard