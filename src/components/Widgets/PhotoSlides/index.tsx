import { usePhotos } from "@/hooks/usePhotos";
import { seconds } from "@/utils/dates";
import { useEffect, useState } from "react";
import { Slide } from "./Slide";

export const PhotoSlides = ({
  onNext,
  slideshowSpeedSeconds,
}: {
  onNext: () => void;
  slideshowSpeedSeconds: number;
}) => {
  const [cycles, setCycles] = useState(0);
  const [index, setIndex] = useState(0);

  const { data: photoSlides, refresh } = usePhotos();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!photoSlides) return;

      const newIndex = index + 1;

      if (cycles === 3) {
        onNext();
        return;
      }

      if (newIndex + 2 > photoSlides.length) {
        setCycles(cycles + 1);
        refresh();
        setIndex(0);
        return;
      }

      setIndex(newIndex);
    }, seconds(slideshowSpeedSeconds));

    return () => clearInterval(interval);
  });

  if (!photoSlides) return null;

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      {photoSlides.map((slide, i) => (
        <Slide key={i} currentIndex={index} index={i} slide={slide} />
      ))}
    </div>
  );
};
