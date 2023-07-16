import { useEffect, useState } from "react";
import { Holiday } from "@prisma/client";
import { GetData as HolidaysGetData } from "@/pages/api/holidays";

const today = () => new Date(new Date().setHours(0, 0, 0, 0));
const currentMonth = () => new Date().getMonth();
const currentDay = () => new Date().getDate();
const currentYear = today().getFullYear();
const getDate = (date: Date) =>
  date.getMonth() <= currentMonth() ||
  (date.getMonth() === currentMonth() && date.getDate() < currentDay())
    ? new Date(date.setFullYear(currentYear + 1))
    : new Date(date.setFullYear(currentYear));

export const useHolidays = () => {
  const [holidays, setHolidays] = useState<(Holiday & { date: Date })[]>([]);
  const [currentHoliday, setCurrentHoliday] = useState<
    (Holiday & { date: Date }) | null
  >(null);

  const today = new Date(new Date().setHours(0, 0, 0, 0));

  useEffect(() => {
    const getHolidays = async () => {
      const response = await fetch("/api/holidays");
      const data: HolidaysGetData = await response.json();

      const formattedHolidays = data.map((holiday) => {
        return {
          ...holiday,
          date: getDate(new Date(`${holiday.month}/${holiday.day}`)),
        };
      });

      setHolidays(formattedHolidays);
      const current = formattedHolidays.find(
        (day) =>
          day.date.getMonth() === currentMonth() &&
          day.date.getDate() === currentDay()
      );
      setCurrentHoliday(current || null);
    };

    getHolidays();
  }, []);

  return { currentHoliday, holidays, today };
};
