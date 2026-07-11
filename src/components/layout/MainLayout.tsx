import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

export default function MainLayout() {
  return (
    <>
      <header >J&G Tour</header>
      <Navbar />

      <main>
        <Outlet />
      </main>
      <footer>© {new Date().getFullYear()} J&G Tour</footer>
    </>
  );
}