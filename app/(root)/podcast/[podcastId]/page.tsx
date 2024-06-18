import React from 'react'

export default function PodcastDetails ({ params }: { params: { podcastId: string } }) {
  const { podcastId } = params;
  return (
    <p className='text-white-1'>
      Details for {podcastId}
    </p>
  );
};
