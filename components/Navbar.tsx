
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, User, Menu, X, Zap, Calendar, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  // Lock body scroll when mobile menu is open to prevent background page scroll & black voids
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Lab', path: '/lab' },
    { name: 'Appointments', path: '/appointment' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/10 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-500 hover:bg-black/80">
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 group">
          <div className="relative">
            <Rocket className="w-6 h-6 md:w-8 h-8 text-neon-blue group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -inset-2 bg-neon-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h1 className="text-xl md:text-2xl font-heading font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple neon-text">
            CORNELIUS <span className="text-white">TEC</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 font-mono text-[9px] font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <Zap size={11} className="text-amber-400 fill-amber-400" />
              <span>100 AI CREDITS</span>
            </div>
          </div>
          
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`text-[10px] font-heading uppercase tracking-widest transition-all duration-300 relative group ${isActive(link.path) ? 'text-neon-blue' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-neon-blue transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button 
          className="md:hidden text-white p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMenuOpen ? <X size={26} className="text-neon-blue" /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-dark-bg/98 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto min-h-screen"
          >
            <div className="flex flex-col space-y-6">
              {/* AI Credits Badge in Mobile Menu */}
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center space-x-2 text-amber-300 font-mono text-xs font-bold">
                  <Zap size={14} className="text-amber-400 fill-amber-400" />
                  <span>100 AI CREDITS ACTIVE</span>
                </div>
                <span className="text-[10px] font-accent uppercase tracking-widest text-gray-500">PRO PLAN</span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-3 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isActive(link.path)
                        ? 'bg-neon-blue/10 border-neon-blue/40 text-neon-blue font-bold shadow-[0_0_20px_rgba(0,207,255,0.15)]'
                        : 'bg-black/40 border-white/5 text-white hover:border-white/20'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg font-heading uppercase tracking-widest">{link.name}</span>
                    <ChevronRight size={18} className={isActive(link.path) ? 'text-neon-blue' : 'text-gray-600'} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons at bottom of mobile menu */}
            <div className="space-y-3 pt-8 mt-auto border-t border-white/10">
              <Link
                to="/appointment"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-4 bg-neon-blue text-dark-bg font-heading text-xs uppercase tracking-widest font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all"
              >
                <Calendar size={16} />
                <span>Book Strategy Session</span>
              </Link>
              
              <a
                href="https://wa.me/250796569416"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-heading text-xs uppercase tracking-widest font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Direct Support</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
