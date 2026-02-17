import React from 'react';
import { ShoppingCart, User, Menu, Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

const UserNavbar = ({ cartCount, onOpenCart, onOpenProfile, onOpenMenu, onNavigate }) => {
  const navItems = [
    { label: 'Home', action: () => onNavigate('Home') },
    { label: 'Menu', action: () => onNavigate('Menu') },
    { label: 'My Orders', action: () => onNavigate('My Orders') },
    { label: 'About', action: () => onNavigate('About') }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('Home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-xl italic font-serif">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight hidden sm:block">Smart Café</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={item.action}
              className="text-paragraph hover:text-white font-medium transition-colors text-sm uppercase tracking-wider px-2 py-1"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all relative group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-lg border-2 border-background animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={onOpenProfile}
            className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all group"
          >
            <User className="w-5 h-5" />
          </button>
          <button className="md:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
