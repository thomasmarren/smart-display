import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { PhotoSlide, PhotoSlidePhoto } from "@/hooks/usePhotos";
import { Orientation } from "@/pages/api/types";
import { useState } from "react";

const Photo = ({
  photo,
  orientation,
}: {
  photo: PhotoSlidePhoto;
  orientation: Orientation;
}) => {
  const [imgSrc, setImgSrc] = useState(photo.url);
  return (
    <Image
      alt={photo.id}
      src={imgSrc}
      fill
      sizes={orientation === Orientation.LANDSCAPE ? "100vw" : "50vw"}
      style={{ objectFit: "cover" }}
      onError={() => {
        setImgSrc(
          "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"
        );
      }}
    />
  );
};

export const Slide = ({
  currentIndex,
  index,
  slide,
}: {
  currentIndex: number;
  index: number;
  slide: PhotoSlide;
}) => {
  const springStyles = useSpring(
    currentIndex === index ? { opacity: 1 } : { opacity: 0 }
  );

  const { orientation, photos } = slide;

  return (
    <>
      {photos.map((photo, i: number) => (
        <animated.div
          key={photo.id}
          style={{
            ...springStyles,
            position: "absolute",
            width: orientation === Orientation.LANDSCAPE ? "100%" : "50%",
            height: "100vh",
            ...(i === 0
              ? {}
              : {
                  right: 0,
                  borderLeft: "5px solid black",
                }),
          }}
        >
          <Photo photo={photo} orientation={orientation} />
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 20,
              color: "white",
              fontSize: 18,
              fontFamily: "Lato",
              textShadow: "#000 2px 1px 2px",
              opacity: 0.8,
            }}
          >
            {`${photo.album.title} • ${new Date(
              photo.creationTime
            ).toLocaleDateString("en-us", {
              month: "short",
              year: "numeric",
            })}`}
          </div>
        </animated.div>
      ))}
    </>
  );
};
