import React from 'react';

interface TalkingAvatarProps {
  isSpeaking?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const TalkingAvatar: React.FC<TalkingAvatarProps> = ({
  isSpeaking = false,
  className = '',
  size = 'md',
}) => {
  // Sizing mappings (increased for highly detailed afro-futuristic presence)
  const dimensions = {
    xs: { width: 50, height: 72, scale: 0.22 },
    sm: { width: 96, height: 140, scale: 0.44 },
    md: { width: 160, height: 232, scale: 0.72 },
    lg: { width: 220, height: 320, scale: 1.0 },
    xl: { width: 300, height: 436, scale: 1.36 },
  };

  const currentDim = dimensions[size];

  return (
    <div className={`avatar-container relative flex flex-col items-center justify-center ${className}`}>
      {/* Self-contained CSS Animations */}
      <style>{`
        @keyframes sway-anim {
          0%, 100% { transform: rotate(-0.8deg); }
          50% { transform: rotate(0.8deg); }
        }
        @keyframes float-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes blink-anim {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.05); }
        }
        @keyframes talk-mouth-anim {
          0%, 100% { ry: 1.5px; }
          25% { ry: 4.5px; }
          50% { ry: 2.5px; }
          75% { ry: 5.5px; }
        }
        @keyframes wave-bar-pulse {
          0% { height: 4px; }
          100% { height: 20px; }
        }
        
        .avatar-float-group {
          animation: float-anim 4s ease-in-out infinite;
        }
        .avatar-sway-body {
          animation: sway-anim 4.5s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .avatar-eye-blink {
          animation: blink-anim 3.8s ease-in-out infinite;
          transform-origin: center;
        }
        .avatar-eye-blink-delay {
          animation: blink-anim 3.8s ease-in-out infinite;
          animation-delay: 0.08s;
          transform-origin: center;
        }
        .mouth-active-talking {
          animation: talk-mouth-anim 0.22s ease-in-out infinite;
        }
      `}</style>

      <div className="avatar-float-group flex flex-col items-center justify-center">
        <svg 
          className="avatar-sway-body select-none" 
          width={currentDim.width} 
          height={currentDim.height} 
          viewBox="0 0 220 320"
        >
          {/* Shoulders/Torso */}
          <path d="M60 230 Q70 200 110 195 Q150 200 160 230 L165 290 Q110 295 55 290 Z" fill="#4f46e5" />
          
          {/* Collar/shirt detail */}
          <path d="M95 195 L110 215 L125 195" fill="none" stroke="#3730a3" strokeWidth="2" />
          
          {/* Neck */}
          <rect x="100" y="175" width="20" height="22" rx="8" fill="#d4a574" />
          
          {/* Neck shadow */}
          <ellipse cx="110" cy="193" rx="10" ry="3" fill="#c4956a" opacity="0.4" />
          
          {/* Head shape */}
          <ellipse cx="110" cy="120" rx="48" ry="58" fill="#d4a574" />
          
          {/* Ears */}
          <ellipse cx="62" cy="125" rx="8" ry="14" fill="#c9956a" />
          <ellipse cx="64" cy="125" rx="4" ry="8" fill="#b8845a" opacity="0.4" />
          <ellipse cx="158" cy="125" rx="8" ry="14" fill="#c9956a" />
          <ellipse cx="156" cy="125" rx="4" ry="8" fill="#b8845a" opacity="0.4" />
          
          {/* Hair back */}
          <ellipse cx="110" cy="85" rx="50" ry="42" fill="#2d1b0e" />
          
          {/* Hair sides */}
          <path d="M62 90 Q58 130 65 145" fill="#2d1b0e" />
          <path d="M158 90 Q162 130 155 145" fill="#2d1b0e" />
          
          {/* Hair front/bangs */}
          <path d="M70 85 Q80 65 110 62 Q140 65 150 85 Q140 78 110 75 Q80 78 70 85" fill="#3d2b1a" />
          
          {/* Eyebrows */}
          <path d="M85 100 Q93 95 101 100" stroke="#2d1b0e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M119 100 Q127 95 135 100" stroke="#2d1b0e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          
          {/* Eyes */}
          <g className="avatar-eye-blink">
            {/* Eye white */}
            <ellipse cx="93" cy="115" rx="10" ry="8" fill="white" />
            {/* Iris */}
            <ellipse cx="93" cy="116" rx="5.5" ry="6" fill="#4a3728" />
            {/* Pupil */}
            <ellipse cx="93" cy="116" rx="2.5" ry="3" fill="#1a0f08" />
            {/* Eye highlight */}
            <ellipse cx="95" cy="113" rx="2" ry="1.5" fill="white" opacity="0.8" />
            {/* Upper eyelid line */}
            <path d="M83 112 Q93 107 103 112" stroke="#2d1b0e" strokeWidth="1.5" fill="none" />
          </g>
          
          <g className="avatar-eye-blink-delay">
            <ellipse cx="127" cy="115" rx="10" ry="8" fill="white" />
            <ellipse cx="127" cy="116" rx="5.5" ry="6" fill="#4a3728" />
            <ellipse cx="127" cy="116" rx="2.5" ry="3" fill="#1a0f08" />
            <ellipse cx="129" cy="113" rx="2" ry="1.5" fill="white" opacity="0.8" />
            <path d="M117 112 Q127 107 137 112" stroke="#2d1b0e" strokeWidth="1.5" fill="none" />
          </g>
          
          {/* Nose */}
          <path d="M107 120 Q110 135 107 140 Q110 143 113 140 Q110 135 113 120" fill="none" stroke="#b8845a" strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="106" cy="140" rx="3" ry="2" fill="#c4956a" opacity="0.5" />
          <ellipse cx="114" cy="140" rx="3" ry="2" fill="#c4956a" opacity="0.5" />
          
          {/* Mouth */}
          <ellipse 
            cx="110" 
            cy="155" 
            rx="8" 
            ry={isSpeaking ? 5 : 1.5} 
            fill="#c0392b" 
            className={isSpeaking ? "mouth-active-talking" : ""}
          />
          
          {/* Upper lip line */}
          <path d="M102 153 Q106 150 110 151 Q114 150 118 153" fill="none" stroke="#a0302a" strokeWidth="1" />
          
          {/* Cheek blush */}
          <ellipse cx="80" cy="138" rx="8" ry="5" fill="#e8a0a0" opacity="0.3" />
          <ellipse cx="140" cy="138" rx="8" ry="5" fill="#e8a0a0" opacity="0.3" />
        </svg>

        {/* Visual Soundwave Pulse Indicator */}
        {size !== 'xs' && (
          <div className="flex items-center justify-center space-x-1 h-6 mt-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-[4px] rounded-full transition-all duration-300 ${
                  isSpeaking 
                    ? 'bg-gradient-to-t from-neon-blue to-neon-purple' 
                    : 'bg-white/20'
                }`}
                style={{
                  animation: isSpeaking ? 'wave-bar-pulse 0.4s ease-in-out infinite alternate' : undefined,
                  animationDelay: isSpeaking ? `${i * 0.08}s` : undefined,
                  height: isSpeaking ? undefined : '4px',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
