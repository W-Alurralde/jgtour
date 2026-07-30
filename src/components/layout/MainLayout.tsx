import Header from '../common/Header';
import Navbar from '../common/Navbar';
import { Outlet } from 'react-router-dom';

import { useGlobalWeather } from '../../hooks/useGlobalWeather';

export default function MainLayout() {
  const { weather, loading, error } = useGlobalWeather();

  return (
    <>
      <Header />

      <Navbar />

      {/* Clima global para toda la aplicación */}
      <section style={{ padding: '8px 16px' }}>
        {loading && <p>🌤 Cargando clima...</p>}

        {error && <p>No se pudo obtener el clima.</p>}

        {weather && (
          <div>
            <p>
              🌤 {weather.city}: {weather.temperature}°C - {weather.description}
            </p>
            <p>💧 Humedad: {weather.humidity}%</p>
            <p>💨 Viento: {weather.windSpeed} m/s</p>
          </div>
        )}
      </section>

      <main>
        <Outlet />
      </main>

      <footer>© {new Date().getFullYear()} J&G Travel</footer>
    </>
  );
}