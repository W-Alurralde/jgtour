import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<h1>Inicio</h1>} />
          <Route path="adventure" element={<h1>Adventure</h1>} />
          <Route path="heritage" element={<h1>Heritage</h1>} />
          <Route path="nature" element={<h1>Nature</h1>} />
          <Route path="family" element={<h1>Family</h1>} />
          <Route path="business" element={<h1>Business</h1>} />
          <Route path="premium" element={<h1>Premium</h1>} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}