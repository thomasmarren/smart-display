import { Clock } from "@/components/Time/Clock";
import { useHolidays } from "@/hooks/useHolidays";
import { seconds } from "@/utils/dates";
import { useEffect } from "react";
import { EventsSection } from "./EventsSection";

export const Holidays = ({ onNext }: { onNext: () => void }) => {
  const { currentHoliday, holidays } = useHolidays();

  useEffect(() => {
    const timeout = setTimeout(() => {
      onNext();
    }, seconds(30));

    return () => clearTimeout(timeout);
  });

  const sorted = holidays
    .filter((holiday) => holiday.date > new Date())
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        fontFamily: "Roboto",
        backgroundColor: "#000",
      }}
    >
      <div style={{ position: "absolute", right: 10, top: 10 }}>
        <Clock style={{ fontSize: "36px" }} />
      </div>
      {currentHoliday ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "120px", margin: "30px 20px 70px" }}>
            {currentHoliday.message}
          </h1>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <EventsSection events={sorted.slice(0, 4)} />
          </div>
        </div>
      )}
    </div>
  );
};
