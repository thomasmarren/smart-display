import { useEffect, useState } from "react";
import { Weather } from "./Weather";

export const Time = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    let interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  let hours = time.getHours() % 12;
  hours = hours === 0 ? 12 : hours;
  const minutes = String(time.getMinutes()).padStart(2, "0");

  return (
    <div
      style={{
        position: "absolute",
        color: "white",
        fontFamily: "Roboto",
        textShadow: "#000 1px 1px 15px",
        zIndex: 99,
        bottom: 40,
        right: "5%",
      }}
    >
      <div
        style={{
          lineHeight: "50px",
          fontSize: "5em",
        }}
      >
        {hours}:{minutes}
      </div>
      <Weather />
    </div>
  );
};
