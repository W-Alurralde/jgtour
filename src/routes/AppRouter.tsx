import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home/Home';
import Adventure from '../pages/Adventure/Adventure';
import Heritage from '../pages/Heritage/Heritage';
import Nature from '../pages/Nature/Nature';
import Family from '../pages/Family/Family';
import Business from '../pages/Business/Business';
import Premium from '../pages/Premium/Premium';
import NotFound from '../pages/NotFound/NotFound';
import Contact from '../pages/Contact/Contact';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="adventure" element={<Adventure />} />
          <Route path="heritage" element={<Heritage />} />
          <Route path="nature" element={<Nature />} />
          <Route path="family" element={<Family />} />
          <Route path="business" element={<Business />} />
          <Route path="premium" element={<Premium />} />
          <Route path="contact" element={<Contact />} />        
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}