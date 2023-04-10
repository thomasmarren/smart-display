import { HttpMethod } from "@/constants";
import { useEffect, useState } from "react";

const Spotify = () => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const getUrl = async () => {
      try {
        const response = await fetch("/api/spotify_auth", {
          method: HttpMethod.POST,
        });
        const data = await response.json();
        setUrl(data.url);
      } catch (e) {
        console.error("onError");
        console.error(e);
      }
    };

    getUrl();
  });

  return <a href={url}>Auth with Spotify</a>;
};

export default Spotify;
