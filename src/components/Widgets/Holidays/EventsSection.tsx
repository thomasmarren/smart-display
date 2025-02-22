import { Holiday } from "@prisma/client";
import { daysUntil } from "../../../utils/dates";

export const EventsSection = ({
  events,
}: {
  events: (Holiday & {
    date: Date;
    time: string;
    color: string;
  })[];
}) => {
  const daysUntilText = (date: Date, isAllDay: boolean) => {
    const currentMonth = () => new Date().getMonth();
    const currentDay = () => new Date().getDate();
    const isToday =
      date.getMonth() === currentMonth() && date.getDate() === currentDay();

    if (isToday) return "Today";

    const adder = isAllDay ? 1 : 0;

    return daysUntil(date) > 1 ? `${daysUntil(date) + adder} days` : "Tomorrow";
  };

  return (
    <>
      {events.map((event) => {
        return (
          <div
            key={event.name}
            style={{
              marginBottom: "24px",
              display: "flex",
              backgroundColor: "white",
              color: "black",
              gap: "2rem",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 12px",
                minWidth: "7rem",
                backgroundColor: event.color,
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              <div style={{ fontSize: "60px" }}>
                {event.date.toLocaleDateString("en-us", {
                  day: "2-digit",
                  timeZone: event.time ? "EST" : "UTC",
                })}
              </div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  marginTop: "-5px",
                }}
              >
                {event.date
                  .toLocaleDateString("en-us", {
                    month: "short",
                  })
                  .toUpperCase()}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingRight: "2rem",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "500px",
                }}
              >
                {event.name}
              </div>
              <div style={{ fontSize: "2rem" }}>
                {event.time && `${event.time} - `}
                {daysUntilText(event.date, !event.time)}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
