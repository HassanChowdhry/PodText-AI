import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Podcast = {
  _id: number;
  podcastTitle: string;
  podcastDescription: string;
  imageUrl: string;
};

type PodcastCardProps = {
  podcast: Podcast;
};

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  console.log(podcast)
  const router = useRouter()

  const handleViewsPodcast = () => {
    router.push(`/podcast/${podcast._id}`, {
      scroll: true,
    });
  }
  return (
    // hover scale and shadow effect
    <div 
      className='cursor-pointer text-white-1' 
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