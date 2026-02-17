import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const UserNavbar = ({ cartCount, onOpenCart, onOpenProfile, onOpenMenu, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', action: () => { onNavigate('Home'); setIsMobileMenuOpen(false); } },
    { label: 'Menu', action: () => { onNavigate('Menu'); setIsMobileMenuOpen(false); } },
    { label: 'My Orders', action: () => { onNavigate('My Orders'); setIsMobileMenuOpen(false); } },
    { label: 'About', action: () => { onNavigate('About'); setIsMobileMenuOpen(false); } }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('Home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xl italic font-serif">S</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">Smart Café</span>
          </div>

          {/* Desktop Links */}
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
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-card border-l border-white/10 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-white font-bold text-xl italic">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full text-left p-4 rounded-2xl bg-white/5 text-paragraph hover:text-white hover:bg-white/10 transition-all flex items-center justify-between group"
                  >
                    <span className="font-bold text-lg uppercase tracking-wider">{item.label}</span>
                    <Search className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              <div className="mt-auto p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                <p className="text-paragraph text-xs mb-4 uppercase tracking-[3px]">Campus Dining</p>
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-primary/20">
                  <ShoppingCart className="text-white w-6 h-6" />
                </div>
                <p className="text-white font-bold tracking-tight">V0.2.0-Alpha</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserNavbar;
