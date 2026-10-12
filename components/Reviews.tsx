
import React from 'react';
import { Star, User, MessageSquare } from 'lucide-react';

export interface Review {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date | string;
}

interface ReviewsProps {
  reviews: Review[];
  productId?: string;
  title?: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, productId, title = "Neural Verification" }) => {
  const filteredReviews = productId ? reviews.filter(r => r.productId === productId) : reviews;

  if (filteredReviews.length === 0) {
    return (
      <div className="text-center py-20 opacity-30">
        <MessageSquare size={48} className="mx-auto mb-4" />
        <p className="font-heading text-xs tracking-widest uppercase">No neural logs found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xs text-gray-500 uppercase tracking-[0.4em] mb-8">{title}</h3>
      {filteredReviews.map((review) => (
        <div key={review._id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all african-pattern">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <span className="text-[10px] font-heading text-white uppercase tracking-widest">
                {review.userId.startsWith('user_') ? `AGENT_${review.userId.split('_')[1]}` : review.userId}
              </span>
            </div>
            <div className="flex text-neon-blue">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={10} fill={star <= review.rating ? "currentColor" : "none"} />
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-sm font-body leading-relaxed mb-4">"{review.comment}"</p>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-600 font-accent uppercase tracking-widest">
              Logged: {new Date(review.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-1">
               <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[8px] text-green-500/50 uppercase tracking-tighter">Verified Node</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
