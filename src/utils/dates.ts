type Unit = "minute" | "minutes";

export const hoursAgo = (hours: number) =>
  new Date(new Date().getTime() - hours * 60 * 60 * 1000);

export const seconds = (x: number) => x * 1000;

export const minutes = (x: number) => x * 60 * 1000;

export const isNight = (date = new Date()) =>
  date.getHours() >= 20 || date.getHours() <= 6;
