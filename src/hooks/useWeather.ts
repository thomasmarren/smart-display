import { isNight, minutes } from "@/utils/dates";
import { useEffect, useState } from "react";

type DailyForecast = {
  [key: string]: { max: number; min: number; icon: WeatherCode };
};
type HourlyForecast = {
  [key: string]: { temperature: number; icon: WeatherCode };
};

type OpenMeteoForecast = {
  current_weather: {
    max: number;
    min: number;
    temperature: number;
    weathercode: number;
  };
  hourly: {
    temperature_2m: number[];
    time: string[];
    weathercode: number[];
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
  };
};

export enum WeatherCode {
  SUNNY = "sunny",
  PARTLY_CLOUDY = "partly_cloudy",
  OVERCAST = "overcast",
  NIGHT = "night",
}

const ICONS: { [code: string]: WeatherCode } = {
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

  const end = new Date(today.setDate(today.getDate() + 10));
  const endMonth = ("0" + (end.getMonth() + 1)).slice(-2);
  const endDay = ("0" + end.getDate()).slice(-2);
  const endDate = `${end.getFullYear()}-${endMonth}-${endDay}`;

  return new URLSearchParams({
    latitude: process.env.NEXT_PUBLIC_LATITUDE as string,
    longitude: process.env.NEXT_PUBLIC_LONGITUDE as string,
    current_weather: "true",
    temperature_unit: "fahrenheit",
    timeformat: "iso8601",
    past_days: "0",
    forecast_days: "7",
    start_date: date,
    end_date: endDate,
    timezone: process.env.NEXT_PUBLIC_TIMEZONE as string,
    hourly: "temperature_2m,weathercode",
    daily: "temperature_2m_max,temperature_2m_min,weathercode",
  }).toString();
};

export const useWeather = ({
  withInterval = false,
}: { withInterval?: boolean } = {}) => {
  const [weather, setWeather] = useState<{
    dailyForecast: DailyForecast;
    hourlyForecast: HourlyForecast;
    current: {
      max: number;
      min: number;
      icon: WeatherCode;
      temperature: number;
    };
    loading: boolean;
  }>({
    current: {
      max: 0,
      min: 0,
      icon: WeatherCode.SUNNY,
      temperature: 0,
    },
    hourlyForecast: {},
    dailyForecast: {},
    loading: true,
  });

  useEffect(() => {
    const getWeather = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params()}`
      );

      const data: OpenMeteoForecast = await response.json();

      const hourlyForecast: HourlyForecast = {};
      data.hourly.time.forEach((date, i) => {
        if (new Date(date) < new Date()) return;

        hourlyForecast[date] = {
          temperature: Math.round(data.hourly.temperature_2m[i]),
          icon: isNight(new Date(date))
            ? WeatherCode.NIGHT
            : ICONS[data.hourly.weathercode[i]],
        };
      });

      const dailyForecast: DailyForecast = {};
      data.daily.time.forEach((date, i) => {
        if (i === 0) return;

        dailyForecast[date] = {
          max: Math.round(data.daily.temperature_2m_max[i]),
          min: Math.round(data.daily.temperature_2m_min[i]),
          icon: ICONS[data.hourly.weathercode[i]],
        };
      });

      setWeather({
        hourlyForecast,
        current: {
          max: Math.round(data.daily.temperature_2m_max[0]),
          min: Math.round(data.daily.temperature_2m_min[0]),
          icon: ICONS[data.current_weather.weathercode],
          temperature: Math.round(data.current_weather.temperature),
        },
        dailyForecast,
        loading: false,
      });
    };

    getWeather();

    let interval: NodeJS.Timer;
    if (withInterval) {
      interval = setInterval(() => {
        getWeather();
      }, minutes(15));
    }

    return () => clearInterval(interval);
  }, []);

  return weather;
};
