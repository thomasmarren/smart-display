type Unit = "minute" | "minutes";

export const hoursAgo = (hours: number) =>
  new Date(new Date().getTime() - hours * 60 * 60 * 1000);

export const seconds = (x: number) => x * 1000;

export const minutes = (x: number) => x * 60 * 1000;

export const isNight = (date = new Date()) =>
  date.getHours() >= 20 || date.getHours() <= 6;

export const todayDate = () => {
  return new Date().toLocaleDateString("en-us", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
};

export const daysUntil = (date: Date) => {
  const diffInMilli =
    date.getTime() - new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  return Math.floor(diffInMilli / (1000 * 3600 * 24));
};
