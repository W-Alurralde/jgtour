import { useQuery } from "@tanstack/react-query";

import { getWeather } from "../services/weather";

export function useWeather(city = "Salta") {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),

    // 30 minutos sin volver a consultar
    staleTime: 1000 * 60 * 30,

    // Mantener en cache 2 horas
    gcTime: 1000 * 60 * 60 * 2,

    // NO reconsultar al cambiar de página
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: 1,
  });
}