import { useContext } from "react";

import { WeatherContext } from "../contexts/WeatherContext";

export function useGlobalWeather() {
  return useContext(WeatherContext);
}