import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, loginWithGoogle, logout } = useAuth();
  const { t } = useTranslation();

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img src="/logo-jgtravel.png" alt="JGTravel" style={{ height: 70 }} />
        </Link>

        <nav className={`navbar-menu ${open ? "open" : ""}`}>
          <Link to="/" className="navbar-link" onClick={closeMenu}>
            {t("nav.home")}
          </Link>

          <Link to="/adventure" className="navbar-link" onClick={closeMenu}>
            {t("nav.adventure")}
          </Link>

          <Link to="/nature" className="navbar-link" onClick={closeMenu}>
            {t("nav.nature")}
          </Link>

          <Link to="/family" className="navbar-link" onClick={closeMenu}>
            {t("nav.family")}
          </Link>

          <Link to="/business" className="navbar-link" onClick={closeMenu}>
            {t("nav.business")}
          </Link>

          <Link to="/premium" className="navbar-link" onClick={closeMenu}>
            {t("nav.premium")}
          </Link>

          <Link to="/contact" className="navbar-link" onClick={closeMenu}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="navbar-actions">
          {user ? (
            <div className="navbar-user">
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
            </div>
          ) : (
            <Button variant="primary" onClick={loginWithGoogle}>
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
