import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import ShopPage from './pages/ShopPage';
import CorporatePage from './pages/CorporatePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E1E1E]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/corporate" element={<CorporatePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
