import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <header>J&G Tour</header>
      <main>
        <Outlet />
      </main>
      <footer>© {new Date().getFullYear()} J&G Tour</footer>
    </>
  );
}