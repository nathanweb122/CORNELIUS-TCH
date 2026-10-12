
import React from 'react';
import { ShoppingCart, Star, MessageSquare, Globe, Eye } from 'lucide-react';
import { IMAGES } from '../constants';
import ElectricBorder from './ElectricBorder';

interface MarketplaceItemProps {
  item: {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    createdAt: Date;
    websiteUrl?: string;
    isWebsite?: boolean;
  };
  averageRating: string;
  reviewCount: number;
  onOpenReviews: (id: string) => void;
  onOpenWebsitePreview?: (url: string) => void;
}

export const MarketplaceItem: React.FC<MarketplaceItemProps> = ({ 
  item, 
  averageRating, 
  reviewCount, 
  onOpenReviews,
  onOpenWebsitePreview 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <ElectricBorder color={item.websiteUrl ? '#00CFFF' : '#7C3AED'} borderRadius={40} speed={0.8} chaos={0.08}>
      <div className="glassmorphism rounded-[2.5rem] overflow-hidden border border-white/5 group hover:border-neon-blue/30 transition-all duration-500 flex flex-col h-full shadow-2xl relative">
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-dark-bg/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-neon-blue/20 shadow-xl">
            <span className="font-heading text-neon-blue text-sm tracking-tighter font-bold">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>

        <div className="relative h-64 overflow-hidden">
          <img 
            src={item.images[0] || IMAGES.marketplace} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
          
          <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 backdrop-blur-[2px]">
            <button 
              onClick={() => onOpenReviews(item._id)}
              className="bg-white text-dark-bg p-4 rounded-2xl hover:bg-neon-blue hover:scale-110 transition-all shadow-2xl"
            >
              <MessageSquare size={20} />
            </button>
            <button className="bg-white text-dark-bg p-4 rounded-2xl hover:bg-neon-purple hover:scale-110 transition-all shadow-2xl">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-grow african-pattern">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`text-[9px] uppercase tracking-[0.4em] font-heading ${item.websiteUrl ? 'text-neon-blue' : 'text-neon-purple'}`}>
                  {item.websiteUrl ? 'Web Asset Node' : 'Asset Node'}
                </span>
                <div className="flex items-center text-neon-blue space-x-1">
                  <Star size={10} fill="currentColor" />
                  <span className="text-[10px] font-heading">{averageRating}</span>
                </div>
              </div>
              <h3 className="font-heading text-xl text-white group-hover:text-neon-blue transition-colors leading-tight">{item.title}</h3>
            </div>
          </div>

          <p className="text-gray-500 text-sm font-body leading-relaxed mb-8 flex-grow line-clamp-3">
            {item.description}
          </p>

          <div className="pt-6 border-t border-white/5 flex flex-col space-y-4">
             <div className="flex justify-between items-center text-[10px] text-gray-600 font-accent uppercase tracking-widest">
                <span>Released: {item.createdAt.toLocaleDateString()}</span>
                <button 
                  onClick={() => onOpenReviews(item._id)}
                  className="flex items-center space-x-1 hover:text-neon-blue transition-colors"
                >
                  <MessageSquare size={12} />
                  <span>{reviewCount} Neural Logs</span>
                </button>
             </div>
             
             {item.websiteUrl ? (
               <div className="flex flex-col space-y-2">
                 <button 
                   onClick={() => onOpenWebsitePreview?.(item.websiteUrl!)}
                   className="w-full py-4 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/40 text-white hover:from-neon-blue hover:to-neon-purple hover:text-dark-bg hover:scale-[1.02] transition-all font-heading text-[10px] tracking-[0.3em] uppercase rounded-2xl flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,207,255,0.1)]"
                 >
                   <Globe size={12} className="text-neon-blue animate-pulse" />
                   <span>SEE WEBSITE</span>
                 </button>
                 <button className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/15 text-white text-[9px] tracking-[0.2em] uppercase rounded-xl transition-all">
                   Acquire License
                 </button>
               </div>
             ) : (
               <button className="w-full py-4 bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-dark-bg transition-all font-heading text-[10px] tracking-[0.3em] uppercase rounded-2xl">
                Acquire License
               </button>
             )}
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
};

