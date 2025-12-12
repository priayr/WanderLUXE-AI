import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { TouristView } from './components/TouristView';
import { VendorView } from './components/VendorView';
import { ArGuide } from './components/ArGuide';
import { AiAssistant } from './components/AiAssistant';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 font-sans">
        <Navigation />
        
        <main className="">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tourist" element={<TouristView />} />
            <Route path="/vendor" element={<VendorView />} />
            <Route path="/ar-guide" element={<ArGuide />} />
          </Routes>
        </main>

        <AiAssistant />
      </div>
    </HashRouter>
  );
};

export default App;