import { createContext, type ReactNode } from "react";

import { useWeather } from "../hooks/useWeather";
import type { WeatherData } from "../services/weather";

interface WeatherContextValue {
  weather: WeatherData | undefined;
  loading: boolean;
  error: boolean;
}

export const WeatherContext = createContext<WeatherContextValue>({
  weather: undefined,
  loading: false,
  error: false,
});

interface WeatherProviderProps {
  children: ReactNode;
}

export function WeatherProvider({ children }: WeatherProviderProps) {
  const { data, isLoading, isError } = useWeather("Salta");

  return (
    <WeatherContext.Provider
      value={{
        weather: data,
        loading: isLoading,
        error: isError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}