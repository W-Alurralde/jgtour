export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
}

// Mock temporal para validar React Query
export async function getWeather(city = "Salta"): Promise<WeatherData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city,
        temperature: 22,
        description: "Cielo despejado",
      });
    }, 500);
  });
}