import { useEvery } from "./useEvery";
import { useCallback, useState } from "react";
import { GetData as SpotifyGetData } from "@/pages/api/spotify";

export const useSpotify = () => {
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<SpotifyGetData | null>(null);

  const getCurrentlyPlaying = useCallback(async () => {
    const response = await fetch("/api/spotify");

    const data: SpotifyGetData = await response.json();

    if (!data.track || !data.isPlaying) {
      setCurrentlyPlaying(null);
      return;
    }

    setCurrentlyPlaying(data);
  }, []);

  useEvery({ seconds: 30 }, getCurrentlyPlaying);

  return { data: currentlyPlaying };
};
