import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Header from '../common/Header';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <Outlet />
      </main>
      <footer>© {new Date().getFullYear()} J&G Tour</footer>
    </>
  );
}