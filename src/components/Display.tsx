import { every } from "@/utils/dates";
import { useEffect, useState } from "react";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { PhotoSlides } from "./PhotoSlides";
import { Sleep } from "./Sleep";
import { Spotify } from "./Spotify";
import { Time } from "./Time";

export const Display = () => {
  const [sleep, setSleep] = useState(false);
  const { authorizationUrl, loading, isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    const interval = every({ minute: 1 }, () => {
      if (!sleep && new Date().getHours() === 22) {
        setSleep(true);
      }
      if (sleep && new Date().getHours() === 8) {
        setSleep(false);
      }
    });

    return () => clearInterval(interval);
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <a href={authorizationUrl}>Login</a>;
  }

  if (sleep) return <Sleep />;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "black",
      }}
    >
      <Spotify />
      <Time />
      <PhotoSlides slideshowSpeedSeconds={10} />
    </div>
  );
};
