import { useEcobee } from "@/hooks/useEcobee";
import { useWeather } from "@/hooks/useWeather";
import { Flame, Home, Snowflake, WeatherIcon } from "./icons";

export const Weather = () => {
  console.debug("Rendering Weather");
  const {
    current: { icon, temperature },
    loading,
  } = useWeather({ withInterval: true });

  const { data: thermostat } = useEcobee();

  if (loading) return <div style={{ height: "64px" }} />;

  let homeIcon = <Home scale={0.45} color={"#fff"} />;
  if (thermostat.running) {
    homeIcon =
      thermostat.hvacMode === "cool" ? (
        <Snowflake scale={0.7} />
      ) : (
        <Flame scale={0.7} />
      );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "1.8em",
      }}
    >
      <WeatherIcon icon={icon} scale={thermostat.running ? 2.8 : 1} />
      <span style={{ marginLeft: "-10px" }}>{temperature}°</span>
      {homeIcon}
      <span style={{ marginLeft: "-10px" }}>{thermostat.temperature}°</span>
    </div>
  );
};
