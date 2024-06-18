"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Button from "@/components/ui/button";
import PodcastCard from "@/components/PodcastCard";

export default function Home() {

  const tasks = useQuery(api.tasks.get);

  const podcastData = [
    {
      id: 1,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    },
    {
      id: 2,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    },
    {
      id: 3,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    },
    {
      id: 4,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    },
    {
      id: 5,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    },
    {
      id: 6,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    },
    {
      id: 7,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    },
    {
      id: 8,
      title: "Podcast Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus nec nisi ultrices.",
      imageUrl: "/icons/avatar.svg",
    }
  ];
  return (
    <div className="mt-9 flex flex-col ">
      <section className="flex flex-col gap-5">
        <h1 className="text-[20px] text-white-1 font-bold">Podcasts</h1>

        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {tasks?.map(({ _id, text }: { _id: number, text: string }) => <div key={_id}>{text}</div>)}
        </main>
        
        <div className="podcast_grid">
          {podcastData.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
        {/* <Button className="text-white-1 bg-white-1">Button</Button> */}
      </section>
    </div>
  );
}
