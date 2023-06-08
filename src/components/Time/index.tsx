import { useCurrentWidget, Widgets } from "@/contexts/WidgetProvider";
import { Weather } from "../Weather";
import { Clock } from "./Clock";

export const Time = () => {
  const { widget } = useCurrentWidget();
  return (
    <div
      style={{
        bottom: "20px",
        color: "white",
        display: [Widgets.Forecast, Widgets.Holidays].includes(widget)
          ? "none"
          : "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        fontFamily: "Roboto",
        position: "absolute",
        right: "25px",
        textShadow: "#000 1px 1px 15px",
        zIndex: 99,
      }}
    >
      <div style={{ textAlign: "end", marginRight: 5, fontSize: 18 }}>
        {new Date().toLocaleDateString("en-us", {
          weekday: "short",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </div>
      <Clock style={{ justifySelf: "flex-end", marginBottom: -18 }} />
      <Weather />
    </div>
  );
};
