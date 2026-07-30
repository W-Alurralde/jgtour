import { httpClient, ENDPOINTS } from "../../api";

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeather(city = "Salta"): Promise<WeatherData> {
  const response = await httpClient.get<OpenWeatherResponse>(
  ENDPOINTS.WEATHER,
  {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "es",
    },
  }
);

  const data = response.data;

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    description: data.weather[0]?.description ?? "Sin descripción",
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0]?.icon ?? "01d",
  };
}