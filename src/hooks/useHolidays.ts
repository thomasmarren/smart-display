import { useEffect, useState } from "react";
import { Holiday } from "@prisma/client";
import { GetData as HolidaysGetData } from "@/pages/api/holidays";
import { GetData as CalendarGetData } from "@/pages/api/calendar";

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
  const [holidays, setHolidays] = useState<
    (Holiday & { date: Date; time: string; color: string })[]
  >([]);
  const [currentHoliday, setCurrentHoliday] = useState<
    (Holiday & { date: Date }) | null
  >(null);

  useEffect(() => {
    const getHolidays = async () => {
      const response = await fetch("/api/holidays");
      const data: HolidaysGetData = await response.json();

      const calendarResponse = await fetch("api/calendar");
      const calendarData: CalendarGetData = await calendarResponse.json();

      const formattedCalendar = calendarData.events.map(
        (event: { name: string; date: string }) => {
          return {
            ...event,
            date: new Date(event.date),
            isHoliday: false,
          };
        }
      );
      const formattedHolidays = data.map((holiday) => {
        return {
          ...holiday,
          date: getDate(new Date(`${holiday.month}/${holiday.day}`)),
          isHoliday: true,
        };
      });

      setHolidays([...formattedHolidays, ...formattedCalendar]);
      const current = formattedHolidays.find(
        (day) =>
          day.isHoliday &&
          day.date.getMonth() === currentMonth() &&
          day.date.getDate() === currentDay()
      );
      setCurrentHoliday(current || null);
    };

    getHolidays();
  }, []);

  return { currentHoliday, holidays };
};
