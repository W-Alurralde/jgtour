import { Link } from "react-router-dom";
import type { User } from "firebase/auth";
import Button from "@/components/ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const links = [
  { to: "/", label: "Inicio", icon: "fa-house" },
  { to: "/adventure", label: "Aventura", icon: "fa-plane-departure" },
  { to: "/nature", label: "Naturaleza", icon: "fa-tree" },
  { to: "/family", label: "Familia", icon: "fa-users" },
  { to: "/business", label: "Negocios", icon: "fa-briefcase" },
  { to: "/premium", label: "Premium", icon: "fa-crown" },
  { to: "/contact", label: "Contacto", icon: "fa-envelope" },
];

export default function MobileDrawer({
  open,
  onClose,
  user,
  loginWithGoogle,
  logout,
}: Props) {
  // 👈 IMPORTANTE: si no está abierto, NO renderiza nada
  if (!open) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />

      <aside className="mobile-drawer open">
        <div className="drawer-header">
          {user ? (
            <div className="drawer-user">
              <img
                src={user.photoURL ?? "/avatar-placeholder.png"}
                alt={user.displayName ?? "Usuario"}
                className="drawer-avatar"
              />

              <div>
                <strong>{user.displayName}</strong>
                <p>{user.email}</p>
              </div>
            </div>
          ) : (
            <Button fullWidth onClick={loginWithGoogle}>
              Iniciar sesión con Google
            </Button>
          )}
        </div>

        <nav className="drawer-nav">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="drawer-link"
            >
              <i className={`fa-solid ${link.icon}`} />

              <span>{link.label}</span>

              <i className="fa-solid fa-chevron-right drawer-chevron" />
            </Link>
          ))}
        </nav>

        {user && (
          <div className="drawer-footer">
            <Button variant="outline" fullWidth onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
