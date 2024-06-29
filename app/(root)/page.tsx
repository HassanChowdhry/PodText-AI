"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PodcastCard from "@/components/PodcastCard";

export default function Home() {

  const podcastData = useQuery(api.podcasts.getPodcasts);

  return (
    <div className="mt-9 flex flex-col ">
      <section className="flex flex-col gap-5">
        <h1 className="text-[20px] text-white-1 font-bold">Podcasts</h1>
      
        <div className="podcast_grid">
          {podcastData?.map((podcast: any) => (
            <PodcastCard key={podcast._id} podcast={podcast} />
          ))}
        </div>
      </section>
    </div>
  );
}
