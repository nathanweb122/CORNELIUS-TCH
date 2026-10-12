
import React from 'react';
import { Globe, Shield, Video, Sparkles } from 'lucide-react';
import AppointmentForm from '../components/AppointmentForm';

export const Appointment: React.FC = () => {
  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 space-y-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-32 relative">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-1.5 glassmorphism border border-neon-purple/30 rounded-full">
            <Sparkles size={14} className="text-neon-purple animate-pulse" />
            <span className="text-neon-purple font-heading text-[9px] tracking-[0.4em] uppercase">Human Interface Point</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl mb-8 leading-none tracking-tight">
            BOOK A <br />
            <span className="text-neon-blue">STRATEGY</span> SESSION
          </h1>
          <p className="text-gray-400 font-subheading text-base md:text-xl mb-12 leading-relaxed max-w-md">
            Direct access to the architects of Cornelius TEC. Discuss architecture, AI integration, or brand trajectory from our hubs in Rwanda and Liberia.
          </p>
          
          <div className="space-y-6">
            {[
              { icon: Video, title: 'Neural Meeting', desc: 'Secure Google Meet Link', color: 'text-neon-blue' },
              { icon: Globe, title: 'Global Timezones', desc: 'UTC / WAT / CAT Sync', color: 'text-neon-purple' },
              { icon: Shield, title: 'Encrypted Briefing', desc: 'NDA Protected Sessions', color: 'text-neon-blue' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-5 p-6 glassmorphism rounded-[2rem] border-l-4 border-neon-blue transition-all hover:bg-white/5">
                <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-white font-heading text-sm tracking-wide">{item.title}</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest font-accent">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-neon-blue/10 blur-[100px] rounded-full pointer-events-none" />
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};
