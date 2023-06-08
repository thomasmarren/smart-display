import { useEffect } from "react";
import { minutes as minutesFn, seconds as secondsFn } from "../utils/dates";

type Unit = "minute" | "minutes" | "seconds";

export const useEvery = (
  duration: { [key in Unit]?: number },
  fn: () => void
) => {
  const { minutes, minute, seconds } = duration;
  const s = seconds;
  const m = minutes || minute;

  let interval: number = 0;
  if (m) interval = minutesFn(m);
  if (s) interval = secondsFn(s);

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
