import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Company from './pages/Company';
import Investor from './pages/Investor';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/investor" element={<Investor />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
