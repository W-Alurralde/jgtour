import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import WeatherCompact from "./WeatherCompact";
import MobileDrawer from "./MobileDrawer";
import Button from "@/components/ui/Button";

import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, loginWithGoogle, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img
              src="/logo-jgtravel.png"
              alt="JGTravel"
              className="navbar-logo"
            />
          </Link>

          {/* DESKTOP */}
          <nav className="navbar-menu desktop-only">
            <Link to="/">Inicio</Link>
            <Link to="/adventure">Aventura</Link>
            <Link to="/nature">Naturaleza</Link>
            <Link to="/family">Familia</Link>
            <Link to="/business">Negocios</Link>
            <Link to="/premium">Premium</Link>
            <Link to="/contact">Contacto</Link>
          </nav>

          {/* DERECHA */}
          <div className="navbar-right">
            <WeatherCompact />

            {/* Desktop usuario */}
            <div className="desktop-only navbar-user">
              {user ? (
                <>
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName ?? "Usuario"}
                      className="navbar-avatar"
                    />
                  )}

                  <span>{user.displayName}</span>

                  <Button variant="outline" onClick={logout}>
                    Salir
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleLogin}>
                  Iniciar sesión
                </Button>
              )}
            </div>

            {/* Mobile hamburguesa */}
            <button
              className="navbar-toggle mobile-only"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Drawer solo mobile */}
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
