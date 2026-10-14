
import { useWeather } from "@/hooks/useWeather";

export default function WeatherCompact() {
  const { data } = useWeather();

  if (!data) return null;

  const iconUrl =
    `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="weather-compact">
      <img
        src={iconUrl}
        alt={data.description}
        width={32}
        height={32}
        loading="lazy"
      />

      <span>
        {Math.round(data.temperature)}°
      </span>
    </div>
  );
}
