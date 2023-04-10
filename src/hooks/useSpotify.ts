import { useEvery } from "./useEvery";
import { useCallback, useState } from "react";

export const useSpotify = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<{
    album: string;
    artist: string;
    track: string;
    albumUrl: string;
  } | null>(null);

  const getCurrentlyPlaying = useCallback(async () => {
    const response = await fetch("/api/spotify");

    const data = await response.json();

    console.log(data);

    if (!data.track) return;

    setCurrentlyPlaying(data);
  }, []);

  useEvery({ minutes: 5 }, getCurrentlyPlaying);

  return { data: currentlyPlaying };
};
