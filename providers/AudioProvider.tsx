"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState, useContext } from "react";

type AudioProps = {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  podcastId: string;
}

type AudioContextType  = {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

const AudioContext = createContext<AudioContextType | null>(null);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "create-podcast") setAudio(undefined);
  }, [pathname]);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within a AudioProvider");
  return context;
};

export default AudioProvider;