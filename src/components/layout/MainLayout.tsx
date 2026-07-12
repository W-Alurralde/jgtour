import Header from '../common/Header';
import Navbar from '../common/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Header />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer>© {new Date().getFullYear()} J&G Travel</footer>
    </>
  );
}