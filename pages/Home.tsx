
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Cpu, Globe, Shield, Activity, Radio, Sparkles } from 'lucide-react';
import { SERVICES } from '../constants';
import { Hero } from '../components/Hero';
import { Reviews, Review } from '../components/Reviews';
import { getReviews } from '../api';

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="glassmorphism p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-white/5 flex flex-col items-center group hover:neon-border-gradient transition-all duration-500 hover:scale-105 shadow-2xl">
    <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/5 mb-4 md:mb-6 text-${color} group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(0,0,0,0.5)] border border-white/5`}>
      <Icon size={24} className="md:w-7 md:h-7" />
    </div>
    <span className="font-heading text-2xl md:text-3xl mb-1 text-white tracking-tighter">{value}</span>
    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-gray-500 font-heading font-bold">{label}</span>
  </div>
);

export const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeHub, setActiveHub] = useState<'Kigali' | 'Monrovia' | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const fetchRecentReviews = async () => {
      try {
        const res = await getReviews();
        // Ensure res.data is an array before slicing
        const data = Array.isArray(res.data) ? res.data : (res as any);
        setReviews((Array.isArray(data) ? data : []).slice(0, 3));
      } catch (err) {
        console.error("System Log Sync Error:", err);
        // Fallback mock reviews if mock interceptor fails
        setReviews([
          { _id: 'hrev_1', userId: 'user_Kigali', productId: 'all', rating: 5, comment: "The AI integration modules transformed our logistics stack. Truly world-class engineering.", createdAt: new Date('2024-03-15') },
          { _id: 'hrev_2', userId: 'user_Monrovia', productId: 'all', rating: 5, comment: "Exceptional UI/UX that respects our bandwidth constraints while looking absolutely stunning.", createdAt: new Date('2024-03-20') }
        ]);
      }
    };

    fetchRecentReviews();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hubs = {
    Kigali: { stats: "98% Fiber Efficiency", projects: "142 Active Nodes", color: "neon-blue" },
    Monrovia: { stats: "Low Latency Edge", projects: "89 Active Nodes", color: "neon-purple" }
  };

  return (
    <div className="pb-20">
      <Hero scrollY={scrollY} />

      {/* Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-28 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard label="Optimization" value="99.9%" icon={Zap} color="neon-blue" />
          <StatCard label="Deployments" value="2.8k+" icon={Cpu} color="neon-purple" />
          <StatCard label="Global Uptime" value="100%" icon={Shield} color="neon-blue" />
          <StatCard label="Tech Nodes" value="GLOBAL" icon={Globe} color="neon-purple" />
        </div>
      </section>

      {/* Renaissance Section */}
      <section className="py-20 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-32">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 mb-6 md:mb-10 px-5 py-2 glassmorphism rounded-full border border-neon-gold/30">
                <span className="text-neon-gold font-heading text-[10px] tracking-[0.5em] uppercase font-bold">The Renaissance</span>
              </div>
              <h2 className="font-heading text-4xl md:text-8xl mb-8 md:mb-12 leading-[1] md:leading-[0.95] tracking-tighter">
                BORN IN LIBERIA <br />
                <span className="kente-gradient font-bold italic">BASED IN RWANDA</span>
              </h2>
              <p className="text-gray-400 font-subheading text-lg md:text-2xl mb-10 md:mb-14 max-w-2xl leading-relaxed">
                We bridge the ancestral wisdom of African craftsmanship with the silicon future of quantum computing. We don't just build software; we architect legacies.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center lg:justify-start">
                <div className="p-6 md:p-8 glassmorphism rounded-2xl md:rounded-[2rem] border-l-4 border-neon-blue shadow-2xl bg-black/40">
                   <p className="text-white font-heading text-sm tracking-widest uppercase mb-2 md:mb-3">Humanity First</p>
                   <p className="text-gray-500 text-[10px] md:text-xs font-accent uppercase tracking-widest leading-relaxed text-left">Tech built for people, not just algorithms.</p>
                </div>
                <div className="p-6 md:p-8 glassmorphism rounded-2xl md:rounded-[2rem] border-l-4 border-neon-purple shadow-2xl bg-black/40">
                   <p className="text-white font-heading text-sm tracking-widest uppercase mb-2 md:mb-3">Quantum Velocity</p>
                   <p className="text-gray-500 text-[10px] md:text-xs font-accent uppercase tracking-widest leading-relaxed text-left">African-fast deployments. Zero friction.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative group w-full">
               <div className="absolute -inset-10 bg-neon-blue/10 rounded-full blur-[150px] group-hover:bg-neon-blue/20 transition-all duration-700" />
               <div className="relative glassmorphism p-4 md:p-6 rounded-[2.5rem] md:rounded-[5rem] border border-white/10 rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" 
                    alt="African Tech Ecosystem" 
                    className="rounded-[2rem] md:rounded-[4.5rem] w-full h-[300px] md:h-[650px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-neon-blue/20 backdrop-blur-3xl border border-neon-blue/50 flex items-center justify-center animate-float shadow-[0_0_40px_rgba(0,207,255,0.4)]">
                        <Cpu className="text-neon-blue w-8 h-8 md:w-14 md:h-14" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Matrix */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-48">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-28 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-7xl mb-6 md:mb-10 text-white tracking-tight leading-none uppercase">Capabilities <span className="text-neon-blue">Matrix</span></h2>
            <p className="text-gray-500 font-subheading text-lg md:text-2xl leading-relaxed">A unified ecosystem of technological superiority designed for maximum velocity.</p>
          </div>
          <Link to="/services" className="w-full md:w-auto px-12 py-5 glassmorphism rounded-2xl md:rounded-3xl text-[10px] font-heading tracking-[0.4em] uppercase border border-white/10 hover:border-neon-purple transition-all hover:scale-105 active:scale-95 shadow-xl text-center">
            Browse Stacks
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {SERVICES.map((service) => (
            <div key={service.id} className="group glassmorphism p-8 md:p-14 rounded-3xl md:rounded-[4rem] border border-white/5 hover:border-neon-blue/40 transition-all duration-700 relative overflow-hidden h-[380px] md:h-[420px] flex flex-col justify-between shadow-2xl bg-black/20">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-neon-blue/5 rounded-full blur-3xl group-hover:bg-neon-blue/20 transition-all" />
              <div>
                <div className="text-5xl md:text-6xl mb-6 md:mb-10 group-hover:scale-125 transition-transform origin-left drop-shadow-2xl">{service.icon}</div>
                <h3 className="font-heading text-xl md:text-2xl mb-4 md:mb-8 text-white group-hover:text-neon-blue transition-colors leading-tight uppercase tracking-tight">{service.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm font-body leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-4">
                  {service.description}
                </p>
              </div>
              <Link to="/services" className="flex items-center text-neon-purple font-accent text-[10px] md:text-[11px] tracking-[0.3em] uppercase group-hover:gap-5 transition-all font-bold">
                Access Node <ArrowRight size={18} className="ml-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Global Node Map (Silk Road) */}
      <section className="py-20 md:py-48 bg-black/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-24">
             <h2 className="font-heading text-3xl md:text-6xl mb-6 tracking-tighter uppercase">The Digital <span className="text-neon-blue">Silk Road</span></h2>
             <p className="text-gray-500 font-subheading uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs">Architecting the bridge between East and West African Hubs</p>
          </div>
          
          <div className="relative glassmorphism h-[400px] md:h-[600px] rounded-[2.5rem] md:rounded-[5rem] border border-white/5 overflow-hidden flex items-center justify-center bg-dark-bg/60 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
             <div className="absolute inset-0 opacity-10 neural-grid" />
             
             {/* Map Interaction */}
             <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20">
                <div 
                  className="absolute left-[15%] md:left-[20%] top-[40%] group cursor-pointer"
                  onMouseEnter={() => setActiveHub('Kigali')}
                  onMouseLeave={() => setActiveHub(null)}
                  onClick={() => setActiveHub(activeHub === 'Kigali' ? null : 'Kigali')}
                >
                   <div className="relative">
                      <div className="absolute -inset-4 md:-inset-6 bg-neon-blue/20 rounded-full animate-ping" />
                      <div className="w-4 h-4 md:w-6 md:h-6 bg-neon-blue rounded-full shadow-[0_0_30px_#00CFFF]" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 md:mt-6 text-center whitespace-nowrap">
                        <span className="font-heading text-[8px] md:text-xs tracking-widest text-white uppercase bg-black/80 px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-neon-blue/30 shadow-2xl">Kigali Node</span>
                      </div>
                   </div>
                </div>

                <div 
                  className="absolute right-[15%] md:right-[20%] bottom-[40%] group cursor-pointer"
                  onMouseEnter={() => setActiveHub('Monrovia')}
                  onMouseLeave={() => setActiveHub(null)}
                  onClick={() => setActiveHub(activeHub === 'Monrovia' ? null : 'Monrovia')}
                >
                   <div className="relative">
                      <div className="absolute -inset-4 md:-inset-6 bg-neon-purple/20 rounded-full animate-ping" />
                      <div className="w-4 h-4 md:w-6 md:h-6 bg-neon-purple rounded-full shadow-[0_0_30px_#7A00FF]" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 md:mt-6 text-center whitespace-nowrap">
                        <span className="font-heading text-[8px] md:text-xs tracking-widest text-white uppercase bg-black/80 px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-neon-purple/30 shadow-2xl">Monrovia Node</span>
                      </div>
                   </div>
                </div>

                {/* Information Overlay */}
                {activeHub && (
                  <div className="absolute top-4 right-4 left-4 md:left-auto md:top-12 md:right-12 md:w-80 glassmorphism p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-white/10 animate-fade-in shadow-2xl backdrop-blur-2xl z-20">
                    <div className="flex items-center space-x-4 mb-4 md:mb-8">
                       <Activity className={`text-${hubs[activeHub].color} animate-pulse`} size={20} />
                       <h4 className="font-heading text-lg md:text-xl text-white tracking-tight uppercase">{activeHub} Status</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
                       <div>
                          <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1 md:mb-2 font-bold">Saturation</p>
                          <p className="text-sm md:text-lg text-white font-heading">{hubs[activeHub].stats}</p>
                       </div>
                       <div>
                          <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1 md:mb-2 font-bold">Active Grid</p>
                          <p className="text-sm md:text-lg text-white font-heading">{hubs[activeHub].projects}</p>
                       </div>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Reviews Node */}
      <section className="py-20 md:py-48 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-32">
           <div className="lg:col-span-1 text-center lg:text-left">
              <h2 className="font-heading text-4xl md:text-5xl mb-6 md:mb-10 text-white uppercase tracking-tighter leading-none">Voices of the <span className="text-neon-purple">Matrix</span></h2>
              <p className="text-gray-400 font-subheading text-lg md:text-xl leading-relaxed mb-8 md:mb-12">Real-time signals from our global infrastructure partners. Every deployment is a verified success node.</p>
              <Link to="/marketplace" className="inline-flex items-center space-x-3 text-neon-blue font-heading text-[10px] md:text-xs tracking-[0.4em] uppercase group font-bold">
                 <span>Explore the Vault</span>
                 <ArrowRight className="group-hover:translate-x-3 transition-transform" />
              </Link>
           </div>
           <div className="lg:col-span-2">
              <Reviews reviews={reviews} title="System-Wide Logs" />
           </div>
        </div>
      </section>
    </div>
  );
};
