
import React from 'react';
import { Twitter, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-card-bg border-t border-white/5 african-pattern py-12 px-4 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-heading text-2xl font-bold mb-4 tracking-wider">
            CORNELIUS <span className="text-neon-blue">TEC</span>
          </h2>
          <p className="text-gray-400 font-body leading-relaxed max-w-md">
            Pioneering the digital landscape from the heart of African innovation. We build tools that bridge the gap between imagination and reality.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-neon-blue hover:text-dark-bg transition-colors"><Twitter size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-neon-blue hover:text-dark-bg transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-neon-blue hover:text-dark-bg transition-colors"><Github size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-neon-blue hover:text-dark-bg transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm uppercase tracking-widest text-neon-blue mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 font-subheading">
            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Career Hub</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm uppercase tracking-widest text-neon-purple mb-4">Direct Contact</h3>
          <ul className="space-y-2 text-gray-400 font-subheading text-xs">
            <li>Rwanda / Liberia</li>
            <li>
              <a 
                href="mailto:corneliustch@gmail.com" 
                className="hover:text-neon-blue transition-colors flex items-center space-x-2"
              >
                <span>corneliustch@gmail.com</span>
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/message/ILBNJCGAXZL3I1" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-emerald-400 transition-colors flex items-center space-x-2"
              >
                <span>WhatsApp: Cornelius Howe (+250796569416)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-accent">
        <p>© 2024 Cornelius TEC. Innovation That Defies Gravity.</p>
        <button 
          onClick={scrollToTop}
          className="mt-4 md:mt-0 flex items-center space-x-1 hover:text-neon-blue transition-colors group"
        >
          <span>Back to Orbit</span>
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
