import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SpotifyCallback = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!router.query.code) return;

    const getAccessToken = async () => {
      try {
        const response = await fetch(
          `/api/spotify_auth?${new URLSearchParams({
            code: router.query.code as string,
            state: router.query.state as string,
          })}`
        );
        const data = await response.json();
        if (data.isAuthenticated) {
          localStorage.setItem("isSpotifyAuthenticated", "true");
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("onSuccess");
        console.error(e);
      }
    };

    getAccessToken();
  });

  if (isAuthenticated) return redirect("/display");

  return <div>Authenticating...</div>;
};

export default SpotifyCallback;
