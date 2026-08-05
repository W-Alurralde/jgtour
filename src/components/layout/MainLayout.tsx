import Navbar from "@/components/common/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer>© {new Date().getFullYear()} J&G Travel</footer>
    </>
  );
}