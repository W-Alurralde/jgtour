import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <nav>
      <Link to="/home">{t("nav.home")}</Link>
      {" | "}
      <Link to="/adventure">{t("nav.adventure")}</Link>
      {" | "}
      <Link to="/nature">{t("nav.nature")}</Link>
      {" | "}
      <Link to="/family">{t("nav.family")}</Link>
      {" | "}
      <Link to="/business">{t("nav.business")}</Link>
      {" | "}
      <Link to="/premium">{t("nav.premium")}</Link>
      {" | "}
      <Link to="/contact">{t("nav.contact")}</Link>

      {" | "}

      {user ? (
        <span>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName ?? "Usuario"}
              width={28}
              height={28}
              style={{
                borderRadius: "50%",
                verticalAlign: "middle",
                marginRight: "8px",
              }}
            />
          )}

          {user.displayName}

          <button
            onClick={logout}
            style={{ marginLeft: "8px" }}
          >
            Salir
          </button>
        </span>
      ) : (
        <button onClick={loginWithGoogle}>
          Iniciar sesión
        </button>
      )}
    </nav>
  );
}