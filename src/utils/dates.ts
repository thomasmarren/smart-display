type Unit = "minute" | "minutes";

export const hoursAgo = (hours: number) =>
  new Date(new Date().getTime() - hours * 60 * 60 * 1000);
