import { useQuery } from "@tanstack/react-query";

import { getWeather } from "../services/weather";

export function useWeather(city = "Salta") {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
  });
}