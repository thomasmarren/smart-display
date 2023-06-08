import { Clock } from "@/components/Time/Clock";
import { useHolidays } from "@/hooks/useHolidays";
import { seconds } from "@/utils/dates";
import { useEffect } from "react";

export const Holidays = ({ onNext }: { onNext: () => void }) => {
  const { currentHoliday, holidays, today } = useHolidays();

  useEffect(() => {
    const timeout = setTimeout(() => {
      onNext();
    }, seconds(30));

    return () => clearTimeout(timeout);
  });

  const daysUntil = (date: Date) => {
    const diffInMilli = date.getTime() - today.getTime();
    return diffInMilli / (1000 * 3600 * 24);
  };

  const sorted = holidays
    .filter((holiday) => holiday.date > new Date())
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 4);

  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        fontFamily: "Roboto",
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
        <>
          <h1 style={{ fontSize: "55px", margin: "30px 0 70px" }}>Upcoming</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {sorted.slice(0, 2).map((holiday) => (
                <div
                  key={holiday.name}
                  style={{ textAlign: "center", marginBottom: "30px" }}
                >
                  <div style={{ fontSize: "45px" }}>{holiday.name}</div>
                  <div style={{ fontSize: "30px" }}>
                    {holiday.date.toLocaleDateString("en-us", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </div>
                  <div style={{ fontSize: "30px" }}>
                    {daysUntil(holiday.date)} days
                  </div>
                </div>
              ))}
            </div>
            <div>
              {sorted.slice(2, 4).map((holiday) => (
                <div
                  key={holiday.name}
                  style={{ textAlign: "center", marginBottom: "30px" }}
                >
                  <div style={{ fontSize: "35px" }}>{holiday.name}</div>
                  <div style={{ fontSize: "20px" }}>
                    {holiday.date.toLocaleDateString("en-us", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </div>
                  <div style={{ fontSize: "30px" }}>
                    {daysUntil(holiday.date)} days
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
