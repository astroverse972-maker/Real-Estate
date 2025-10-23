import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Listings from './components/pages/Listings';
import PropertyDetail from './components/pages/PropertyDetail';
import MarketInsights from './components/pages/MarketInsights';
import AIConcierge from './components/pages/AIConcierge';

const App: React.FC = () => {
    return (
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/market-insights" element={<MarketInsights />} />
                <Route path="/ai-concierge" element={<AIConcierge />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
    );
};

export default App;