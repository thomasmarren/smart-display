import { useWeather } from "@/hooks/useWeather";
import { WeatherIcon } from "./icons";

export const Weather = () => {
  console.debug("Rendering Weather");
  const weather = useWeather();

  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "1.8em" }}>
      <WeatherIcon icon={weather.icon} />
      <span style={{ marginLeft: "-10px" }}>{weather.temperature}°</span>
    </div>
  );
};
