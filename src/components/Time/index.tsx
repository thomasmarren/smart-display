import { Weather } from "../Weather";
import { Clock } from "./Clock";

export const Time = () => {
  return (
    <div
      style={{
        position: "absolute",
        color: "white",
        fontFamily: "Roboto",
        textShadow: "#000 1px 1px 15px",
        zIndex: 99,
        bottom: "6.5%",
        right: "2%",
      }}
    >
      <Clock />
      <Weather />
    </div>
  );
};
