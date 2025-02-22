import { Orientation } from "@/pages/api/types";
import { Album, Photo } from "@prisma/client";
import { useEffect, useState } from "react";

export type PhotoSlidePhoto = Photo & { album: Album } & { url: string };
export type PhotoSlide = {
  orientation: Orientation;
  photos: PhotoSlidePhoto[];
};

export const usePhotos = () => {
  const [refreshDate, setRefreshDate] = useState<Date>(new Date());
  const [photoSlides, setPhotoSlides] = useState<PhotoSlide[] | null>(null);

  useEffect(() => {
    const getPhotos = async () => {
      const response = await fetch("/api/photos");

      const data: PhotoSlide[] = await response.json();

      setPhotoSlides(data);
    };

    getPhotos();
  }, [refreshDate]);

  const refresh = () => {
    setRefreshDate(new Date());
  };

  return { data: photoSlides, loading: photoSlides === null, refresh };
};
