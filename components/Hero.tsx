
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants';
import GlitchText from './GlitchText';

export const Hero: React.FC<{ scrollY?: number }> = ({ scrollY = 0 }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Ambient Glow Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center space-x-2 mb-10 px-5 py-2 glassmorphism rounded-full border border-neon-blue/30 shadow-[0_0_20px_rgba(0,207,255,0.1)]">
          <Sparkles size={14} className="text-neon-blue animate-pulse" />
          <span className="text-neon-blue font-heading text-[10px] tracking-[0.5em] uppercase font-bold">Transmission Live</span>
        </div>
        
        <h1 className="font-heading text-4xl sm:text-6xl md:text-[10rem] font-bold mb-6 md:mb-10 tracking-tighter leading-[0.9] md:leading-[0.8] text-white">
          <GlitchText speed={0.8} enableShadows={true} enableOnHover={false}>
            DEFIANCE IN
          </GlitchText>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-gold bg-[length:200%_auto] animate-gradient-flow relative italic px-2 md:px-4">
            DIGITAL FORM
            <span className="absolute -inset-x-4 md:-inset-x-8 -inset-y-2 md:-inset-y-4 bg-neon-blue/5 blur-2xl md:blur-3xl -z-10"></span>
          </span>
        </h1>
        
        <p className="text-lg md:text-3xl text-gray-400 font-light mb-10 md:mb-16 max-w-4xl mx-auto font-subheading leading-relaxed px-4">
          The African digital renaissance has arrived. Engineering world-class <span className="text-white">Architectures</span>, <span className="text-white">Neural Nodes</span>, and <span className="text-white">Mobile Stacks</span> from the heart of Rwanda and Liberia.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4">
          <Link 
            to="/appointment"
            className="w-full md:w-auto px-10 md:px-20 py-5 md:py-7 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl md:rounded-3xl font-heading text-[10px] md:text-xs tracking-[0.4em] uppercase hover:shadow-[0_0_50px_rgba(0,207,255,0.5)] transition-all duration-500 relative group overflow-hidden text-dark-bg font-bold"
          >
            <span className="relative z-10">Initiate Session</span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
          <Link 
            to="/services"
            className="w-full md:w-auto px-10 md:px-20 py-5 md:py-7 border border-white/10 hover:border-neon-blue/50 rounded-2xl md:rounded-3xl font-heading text-[10px] md:text-xs tracking-[0.4em] uppercase transition-all duration-500 glassmorphism flex items-center justify-center group"
          >
            <span>The Matrix</span>
            <ArrowRight size={18} className="ml-3 group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradient-flow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
