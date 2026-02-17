import React from 'react';
import GlassCard from './GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "primary" }) => {
  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
          color === "primary" && "bg-primary/20 text-primary shadow-primary/10",
          color === "secondary" && "bg-secondary/20 text-secondary shadow-secondary/10",
          color === "orange" && "bg-orange-500/20 text-orange-500 shadow-orange-500/10",
          color === "blue" && "bg-blue-500/20 text-blue-500 shadow-blue-500/10",
        )}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
            trend === "up" ? "bg-secondary/10 text-secondary" : "bg-red-500/10 text-red-500"
          )}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendValue}%
          </div>
        )}
      </div>
      <div>
        <p className="text-paragraph text-sm font-medium">{title}</p>
        <h3 className="text-white text-3xl font-bold mt-1 tracking-tight">{value}</h3>
      </div>
    </GlassCard>
  );
};

export default StatCard;
