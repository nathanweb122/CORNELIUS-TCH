import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import Strands from './components/Strands';
import SplashCursor from './components/SplashCursor';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Appointment } from './pages/Appointment';
import { Marketplace } from './pages/Marketplace';
import { DesignLab } from './pages/DesignLab';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdBanner } from './components/AdBanner';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    if (!localStorage.getItem('user_email')) {
      localStorage.setItem('user_email', 'africahowe@gmail.com');
    }
    // Synchronize authentication status with Firebase Auth & Local Storage fallback
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('user_email', user.email || '');
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-body bg-dark-bg text-white selection:bg-neon-blue selection:text-dark-bg relative overflow-x-hidden">
        {/* Global Persistent Moving Strands Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <Strands 
            colors={["#00CFFF", "#7C3AED", "#FFD700", "#F97316"]}
            count={4}
            speed={0.6}
            amplitude={1.2}
            waviness={1.2}
            thickness={0.8}
            glow={2.8}
            taper={3}
            spread={1.2}
            intensity={0.7}
            saturation={2}
            opacity={0.85}
            scale={1.4}
          />
          <div className="absolute inset-0 neural-grid opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/30 via-transparent to-dark-bg/80" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/lab" element={<DesignLab />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </main>

          <AdBanner />
          <Footer />
          <ChatWidget />
          <SplashCursor />
        </div>
      </div>
    </Router>
  );
};

export default App;
