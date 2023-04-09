type Unit = "minute" | "minutes";

export const hoursAgo = (hours: number) =>
  new Date(new Date().getTime() - hours * 60 * 60 * 1000);

export const every = (duration: { [key in Unit]?: number }, fn: () => void) => {
  const { minutes, minute } = duration;
  const m = minutes || minute;

  let interval;
  if (m) interval = m * 60 * 1000;

  if (!interval) throw new Error("Unrecognized duration");

  return setInterval(fn, interval);
};
