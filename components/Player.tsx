"use client";
import { useState, useEffect, useRef, use } from "react";
import { useAudio } from "@/providers/AudioProvider"
import { Progress } from "@/components/ui/progress"
import formatTime from "@/lib/formatTime";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Player() {
  const { audio } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }

  const toggleMute = () => {
    audioRef.current!.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  const forwardByFive = () => {
    if (audioRef.current!.currentTime + 5 < audioRef.current!.duration) {
      audioRef.current!.currentTime += 5;
    }
  }

  const rewindByFive = () => {
    if (audioRef.current!.currentTime - 5 > 0) {
      audioRef.current!.currentTime -= 5;
    } else {
      audioRef.current!.currentTime = 0;
    }
  }
  return (
    <div className={`${!audio && "hidden"} sticky bottom-0 left-0 size-full flex flex-col`}>
      <Progress 
        value={(currTime / duration) * 100}
        className="w-full"
        max={duration}
      />
      <section className="glassmorphism-black flex h-[100px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio 
          ref={audioRef}
          src={audio?.audioUrl}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="flex items-center gap-4 max-md:hidden">
          <Image 
            src={audio?.imageUrl || "/images/player1.png"}
            width={64}
            height={64}
            alt="Podcast image"
            className="aspect-square rounded-xl"
            onClick={() => router.push(`/podcast/${audio?.podcastId}`)}
          />
          <div>
            <h2 className="text-white-1 text-[14px] truncate font-semibold">
              {audio?.title}
            </h2>
            <p className="text-[12px] font-normal text-white-2">          
              {audio?.author}
            </p>
          </div>
        </div>
        <div className="flex-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <Image 
              src="/icons/reverse.svg"
              width={25}
              height={25}
              alt="rewind"
              onClick={rewindByFive}
            />
            <h2 className="text-[12px] font-bold text-white-4">-5</h2>
          </div>
          <Image 
            src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
            width={30}
            height={30}
            alt="play"
            onClick={togglePlay}
          />
          <div className="flex items-center gap-1">
            <h2 className="text-[12px] font-bold text-white-4">+5</h2>
            <Image 
                src="/icons/forward.svg"
                width={25}
                height={25}
                alt="forward"
                onClick={forwardByFive}
              />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex ">
            <h2 className="text-16 font-normal text-white-2 max-md:hidden">
              {formatTime(currTime)}
            </h2>
            <span className="text-16 font-normal text-white-2 max-md:hidden">
              &nbsp;/&nbsp;
            </span>
            <h2 className="text-16 font-normal text-white-2 max-md:hidden">
              {formatTime(duration)}
            </h2>

          </div>
          <div className="flex w-full gap-2">
            <Image
              src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
              width={25}
              height={25}
              alt="mute unmute"
              onClick={toggleMute}
              className="cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
