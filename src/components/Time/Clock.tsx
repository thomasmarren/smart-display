import { useState, useEffect } from "react";

export const Clock = () => {
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
        lineHeight: "50px",
        fontSize: "5em",
      }}
    >
      {hours}:{minutes}
    </div>
  );
};