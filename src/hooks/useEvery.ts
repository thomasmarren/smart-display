import { useEffect } from "react";

type Unit = "minute" | "minutes";

export const useEvery = (
  duration: { [key in Unit]?: number },
  fn: () => void
) => {
  const { minutes, minute } = duration;
  const m = minutes || minute;

  let interval: number = 0;
  if (m) interval = m * 60 * 1000;

  useEffect(() => {
    fn();
    if (interval === 0) {
      console.warn("Unrecognized interval");
      return;
    }

    const id = setInterval(fn, interval);

    return () => clearInterval(id);
  }, [fn, interval]);
};
