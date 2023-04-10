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

    if (!data.track) {
      setCurrentlyPlaying(null);
      return;
    }

    setCurrentlyPlaying(data);
  }, []);

  useEvery({ minute: 1 }, getCurrentlyPlaying);

  return { data: currentlyPlaying };
};
