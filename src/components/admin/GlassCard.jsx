import React from 'react';
import { cn } from '../../lib/utils';

const GlassCard = ({ children, className, hover = true }) => {
  return (
    <div 
      className={cn(
        "glass-morphism rounded-2xl p-6 transition-all duration-300",
        hover && "hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
