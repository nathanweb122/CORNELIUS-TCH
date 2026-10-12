
import React from 'react';

export const AdBanner: React.FC = () => {
  return (
    <div className="w-full bg-dark-bg py-8 flex justify-center px-4 overflow-hidden relative z-0 mt-6">
      <div className="max-w-4xl w-full h-24 border border-white/5 bg-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 african-pattern pointer-events-none" />
        <div className="z-10 text-center px-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-semibold">Sponsored Innovation</p>
          <h4 className="font-heading text-base sm:text-lg text-neon-blue font-bold">ADVERTISEMENT</h4>
          <p className="text-xs text-gray-400">Scale your infrastructure with Cornelius Cloud</p>
        </div>
      </div>
    </div>
  );
};
