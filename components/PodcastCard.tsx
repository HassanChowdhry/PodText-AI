import Image from 'next/image';
import React from 'react';

type Podcast = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

type PodcastCardProps = {
  podcast: Podcast;
};

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className='cursor-pointer text-white-1'>
      <figure className='flex flex-col gap-2'>
        <Image className='h-fit w-full rounded-xl 2xl:size-[200px]' src={podcast.imageUrl} alt={podcast.title} width={175} height={175}/>
        <div className='flex flex-col'>
          <h1 className='text-[16px] truncate font-bold'>{podcast.title}</h1>
          <h2 className='text-[12px] truncate capitalize text-white-4'>{podcast.description}</h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard