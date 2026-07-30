import { useWeather } from "../../hooks/useWeather";

export default function Home() {
  const { data, isLoading } = useWeather();

  return (
    <div>
      <h1>Bienvenido a JGTravel</h1>

      {isLoading ? (
        <p>Cargando clima...</p>
      ) : (
        <p>
          {data?.city}: {data?.temperature}°C - {data?.description}
        </p>
      )}
    </div>
  );
}