
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Menu,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useTrip } from "@/features/trip/hooks/useTrip";

import WeatherCompact from "./WeatherCompact";
import MobileDrawer from "./MobileDrawer";
import Button from "@/components/ui/Button";

import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const {
    user,
    loginWithGoogle,
    logout,
  } = useAuth();

  const {
    itemCount,
    loading: tripLoading,
  } = useTrip();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(
        "Error al iniciar sesión con Google:",
        error
      );
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          {/* LOGOTIPO */}
          <Link
            to="/"
            className="navbar-brand"
          >
            <img
              src="/logo-jgtravel.png"
              alt="JGTravel"
              className="navbar-logo"
            />
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="navbar-menu desktop-only">
            <Link to="/">Inicio</Link>
            <Link to="/adventure">Aventura</Link>
            <Link to="/nature">Naturaleza</Link>
            <Link to="/family">Familia</Link>
            <Link to="/business">Negocios</Link>
            <Link to="/premium">Premium</Link>
            <Link to="/contact">Contacto</Link>

            <Link
              to="/mi-viaje"
              className="navbar-trip-link"
            >
              <BriefcaseBusiness
                size={18}
                aria-hidden="true"
              />

              <span>Mi Viaje</span>

              {!tripLoading && itemCount > 0 && (
                <span className="navbar-trip-count">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* SECCIÓN DERECHA */}
          <div className="navbar-right">

            <WeatherCompact />

            {/* USUARIO DESKTOP */}
            <div className="desktop-only navbar-user">
              {user ? (
                <>
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={
                        user.displayName ??
                        "Usuario"
                      }
                      className="navbar-avatar"
                    />
                  )}

                  <span>
                    {user.displayName}
                  </span>

                  <Button
                    variant="outline"
                    onClick={logout}
                  >
                    Salir
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </Button>
              )}
            </div>

            {/* CARRITO MÓVIL */}
            <Link
              to="/mi-viaje"
              className="navbar-mobile-trip mobile-only"
              aria-label={
                tripLoading
                  ? "Mi Viaje, cargando"
                  : `Mi Viaje, ${itemCount} servicios`
              }
              title="Mi Viaje"
            >
              <BriefcaseBusiness
                size={23}
                aria-hidden="true"
              />

              {!tripLoading && itemCount > 0 && (
                <span className="navbar-mobile-trip-count">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* MENÚ HAMBURGUESA MÓVIL */}
            <button
              type="button"
              className="navbar-toggle mobile-only"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <Menu
                size={25}
                aria-hidden="true"
              />
            </button>

          </div>
        </div>
      </header>

      {/* DRAWER MÓVIL */}
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        loginWithGoogle={loginWithGoogle}
        logout={logout}
      />
    </>
  );
}
