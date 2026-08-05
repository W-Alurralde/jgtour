import { useWeather } from "@/hooks/useWeather";

const weatherIcons: Record<string, string> = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
};

export default function WeatherCompact() {
  const { data } = useWeather();

  if (!data) return null;

  const icon = weatherIcons[data.main] ?? "🌤️";

  return (
    <div className="weather-compact">
      <span>{icon}</span>
      <span>{Math.round(data.temperature)}°</span>
    </div>
  );
}