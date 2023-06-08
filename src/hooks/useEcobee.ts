import { useCallback, useState } from "react";
import { GetData as EcobeeGetData } from "@/pages/api/ecobee";
import { useEvery } from "./useEvery";

const defaultState = {
  humidity: 0,
  temperature: 0,
  hvacMode: "off" as const,
  running: false,
};

export const useEcobee = () => {
  const [thermostat, setThermostat] = useState<EcobeeGetData>(defaultState);

  const getThermostat = useCallback(async () => {
    const response = await fetch("/api/ecobee");

    const data: EcobeeGetData = await response.json();

    setThermostat(data);
  }, []);

  useEvery({ minutes: 5 }, getThermostat);

  return { data: thermostat };
};
