import WidgetProvider from "@/contexts/WidgetProvider";
import { useEvery } from "@/hooks/useEvery";
import { useCallback, useState } from "react";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { Sleep } from "./Sleep";
import { Spotify } from "./Spotify";
import { Time } from "./Time";
import { Widgets } from "./Widgets";

export const Display = () => {
  const [sleep, setSleep] = useState(false);
  const { authorizationUrl, loading, isAuthenticated } = useIsAuthenticated();

  const checkSleep = useCallback(() => {
    if (!sleep && new Date().getHours() === 2) {
      setSleep(true);
    }
    if (sleep && new Date().getHours() === 8) {
      setSleep(false);
    }
  }, [sleep]);

  useEvery({ minute: 1 }, checkSleep);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <a href={authorizationUrl}>Login</a>;
  }

  if (sleep) return <Sleep />;

  return (
    <WidgetProvider>
      <div
        style={{
          height: "100vh",
          display: "flex",
          backgroundColor: "black",
          transform: "scaleY(.95)",
        }}
      >
        <Widgets />
        <Spotify />
        <Time />
      </div>
    </WidgetProvider>
  );
};
