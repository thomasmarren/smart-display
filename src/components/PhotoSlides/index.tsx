import { useEffect, useState } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import { Slide } from "./Slide";

export const PhotoSlides = ({
  slideshowSpeedSeconds,
}: {
  slideshowSpeedSeconds: number;
}) => {
  const [index, setIndex] = useState(0);

  const { data: photoSlides, refresh } = usePhotos();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!photoSlides) return;

      const newIndex = index + 1;

      if (newIndex + 2 > photoSlides.length) {
        refresh();
        setIndex(0);
        return;
      }

      setIndex(newIndex);
    }, slideshowSpeedSeconds * 1000);

    return () => clearInterval(interval);
  });

  // return null;

  if (!photoSlides) return null;

  return (
    <div style={{ display: "flex", width: "100vw" }}>
      {photoSlides.map((slide, i) => (
        <Slide key={i} currentIndex={index} index={i} slide={slide} />
      ))}
    </div>
  );
};
