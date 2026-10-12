import React, { ReactNode, CSSProperties } from 'react';
import './GlitchText.css';

export interface GlitchTextProps {
  children?: ReactNode;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  className = ''
}) => {
  const inlineStyles: CSSProperties & Record<string, string> = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';
  const textContent = typeof children === 'string' || typeof children === 'number' ? String(children) : undefined;

  return (
    <div
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles}
      data-text={textContent || ''}
    >
      {children}
    </div>
  );
};

export default GlitchText;
