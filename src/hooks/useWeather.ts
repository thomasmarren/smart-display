import { useCallback, useState } from "react";
import { useEvery } from "./useEvery";

type OpenMeteoForecast = {
  current_weather: { weathercode: number; temperature: number };
};

enum WeatherCode {
  SUNNY = "sunny",
  PARTLY_CLOUDY = "partly_cloudy",
  OVERCAST = "overcast",
}

const ICONS: { [code: string]: string } = {
  ["0"]: WeatherCode.SUNNY,
  ["1"]: WeatherCode.SUNNY,
  ["2"]: WeatherCode.PARTLY_CLOUDY,
  ["3"]: WeatherCode.OVERCAST,
};

const params = () => {
  const today = new Date();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const date = `${today.getFullYear()}-${month}-${day}`;
  return new URLSearchParams({
    latitude: process.env.NEXT_PUBLIC_LATITUDE as string,
    longitude: process.env.NEXT_PUBLIC_LONGITUDE as string,
    current_weather: "true",
    temperature_unit: "fahrenheit",
    timeformat: "iso8601",
    past_days: "0",
    forecast_days: "7",
    start_date: date,
    end_date: date,
    timezone: process.env.NEXT_PUBLIC_TIMEZONE as string,
  }).toString();
};

export const useWeather = () => {
  const [weather, setWeather] = useState<{
    icon: string;
    temperature: number;
  }>({
    icon: "",
    temperature: 0,
  });

  const getWeather = useCallback(async () => {
    console.log("get weather");
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params()}`
    );

    const data: OpenMeteoForecast = await response.json();

    setWeather({
      icon: ICONS[data.current_weather.weathercode],
      temperature: Math.round(data.current_weather.temperature),
    });
  }, []);

  useEvery({ minutes: 30 }, getWeather);

  return weather;
};
