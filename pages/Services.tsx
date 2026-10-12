
import React from 'react';
import { SERVICES } from '../constants';
import { Globe, Smartphone, Brain, Share2, CheckCircle2, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceIcon = ({ id, className }: { id: string; className?: string }) => {
  switch (id) {
    case 'web': return <Globe className={className} />;
    case 'app': return <Smartphone className={className} />;
    case 'ai': return <Brain className={className} />;
    case 'social': return <Share2 className={className} />;
    default: return <Zap className={className} />;
  }
};

const ServiceSpecs: Record<string, string[]> = {
  web: ['React/Next.js Architecture', 'Low-Latency Optimization', 'Responsive Kente-UI', 'SEO Grounding'],
  app: ['Native iOS/Android', 'Cross-Platform Velocity', 'Biometric Integration', 'Cloud Sync'],
  ai: ['Neural Network Training', 'LLM Fine-Tuning', 'Predictive Analytics', 'Automated Workflows'],
  social: ['Growth Hacking', 'Content Orchestration', 'Global Brand Identity', 'Sentiment Analysis']
};

export const Services: React.FC = () => {
  return (
    <div className="pt-32 pb-40 relative">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 neural-grid opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-1.5 glassmorphism border border-neon-blue/30 rounded-full shadow-[0_0_15px_rgba(0,207,255,0.1)]">
            <Sparkles size={14} className="text-neon-blue animate-pulse" />
            <span className="text-neon-blue font-heading text-[9px] tracking-[0.5em] uppercase font-bold">Capabilities Matrix</span>
          </div>
          <h1 className="font-heading text-6xl md:text-8xl mb-8 leading-[0.9] tracking-tighter">
            ENGINEERING <br />
            <span className="kente-gradient font-bold italic">THE FUTURE</span>
          </h1>
          <p className="text-gray-400 font-subheading text-xl leading-relaxed">
            From our hubs in Kigali and Monrovia, we deploy world-class infrastructure that transcends traditional boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="glassmorphism rounded-[3.5rem] p-10 md:p-14 border border-white/5 hover:border-neon-blue/40 transition-all duration-700 group flex flex-col justify-between overflow-hidden shadow-2xl african-pattern relative"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl group-hover:bg-neon-blue/20 transition-all duration-700" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10 group-hover:neon-glow-blue transition-all duration-500">
                    <ServiceIcon id={service.id} className="w-12 h-12 text-neon-blue" />
                  </div>
                  <span className="text-[10px] font-heading text-gray-600 uppercase tracking-[0.4em] pt-4">ID: {service.id.toUpperCase()}_NODE</span>
                </div>

                <h2 className="font-heading text-3xl md:text-4xl text-white mb-6 tracking-tight group-hover:text-neon-blue transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-400 font-body text-lg leading-relaxed mb-10 max-w-lg">
                  {service.description}
                </p>

                <div className="mb-10">
                  <h3 className="text-[10px] font-heading text-neon-purple uppercase tracking-[0.3em] mb-6">Neural Specs:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {ServiceSpecs[service.id].map((spec, i) => (
                      <div key={i} className="flex items-center space-x-3 group/spec">
                        <CheckCircle2 size={16} className="text-neon-blue opacity-50 group-hover/spec:opacity-100 transition-opacity" />
                        <span className="text-sm text-gray-500 font-subheading group-hover/spec:text-white transition-colors">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
                <Link 
                  to="/appointment" 
                  className="w-full sm:w-auto px-10 py-5 bg-white text-dark-bg rounded-2xl font-heading text-[10px] tracking-widest uppercase hover:bg-neon-blue hover:scale-105 transition-all shadow-2xl flex items-center justify-center space-x-3"
                >
                  <span>Sync Requirement</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
