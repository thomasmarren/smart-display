import { useEffect } from "react";

type Unit = "minute" | "minutes" | "seconds";

export const useEvery = (
  duration: { [key in Unit]?: number },
  fn: () => void
) => {
  const { minutes, minute, seconds } = duration;
  const s = seconds;
  const m = minutes || minute;

  let interval: number = 0;
  if (m) interval = m * 60 * 1000;
  if (s) interval = s * 1000;

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
