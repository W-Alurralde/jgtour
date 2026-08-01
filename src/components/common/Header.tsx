export default function Header() {
  return (
    <header>
      <div>
        <img src="/logo.png" alt="J&G Tour" height={48} />
      </div>

      <div>
        <button>ES</button>
        <button>EN</button>
        <button>PT</button>
      </div>

      <div>
        <button aria-label="Iniciar sesión">👤</button>
      </div>
    </header>
  );
}