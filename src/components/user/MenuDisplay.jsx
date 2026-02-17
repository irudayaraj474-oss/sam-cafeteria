import React, { useState } from 'react';
import { ShoppingCart, Heart, Info, Star, Plus, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../admin/GlassCard';
import { cn } from '../../lib/utils';

const MenuDisplay = ({ menuItems, onAddToCart, searchTerm, onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Veg', 'Non-Veg', 'Drinks', 'Snacks'];

  const filteredItems = (menuItems || []).filter(item => {
    const itemName = item?.name || '';
    const itemCategory = item?.category || '';
    const matchesSearch = itemName.toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesCategory = selectedCategory === 'All' || itemCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto space-y-12">
      {/* Premium Hero Header Section */}

      <div className="flex flex-col lg:flex-row items-center gap-16 mb-20 pt-10">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-[2px] mb-6">
              Welcome to the future of dining
            </span>
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">
              Craving Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500">Extraordinary?</span>
            </h2>
            <p className="text-paragraph text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Order your favorite meals with zero wait time. Smart, contactless, and delicious. Freshly prepared for your campus life.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph group-focus-within:text-primary transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Pizza, Coffee, Burger..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-paragraph/50"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20 group"
              >
                Browse Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="flex-1 relative min-h-[500px] lg:h-[600px] w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-full perspective-1000">
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse opacity-50" />
            
            {/* 1. Salad with Juice (Vertical - Top Left/Center) */}
            <motion.div 
               className="absolute top-0 left-8 md:left-16 w-56 h-72 md:w-64 md:h-80 rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl z-20"
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               whileHover={{ scale: 1.05, rotate: -2, zIndex: 50 }}
            >
               <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600" alt="Healthy Choice" className="w-full h-full object-cover transform scale-110" />
            </motion.div>

            {/* 2. Pizza (Top Right) */}
            <motion.div 
               className="absolute top-[-20px] right-4 md:right-10 w-52 h-52 md:w-60 md:h-60 rounded-[35px] overflow-hidden border-4 border-white/5 shadow-2xl z-10"
               animate={{ y: [10, -10, 10], rotate: [0, 3, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               whileHover={{ scale: 1.05, rotate: 5, zIndex: 50 }}
            >
               <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500" alt="Pizza" className="w-full h-full object-cover" />
            </motion.div>

            {/* 3. Pasta (Bottom Right) */}
            <motion.div 
               className="absolute bottom-20 right-0 md:right-4 w-48 h-48 md:w-56 md:h-56 rounded-[35px] overflow-hidden border-4 border-white/5 shadow-2xl z-10"
               animate={{ y: [-8, 8, -8], rotate: [0, -2, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               whileHover={{ scale: 1.05, rotate: -5, zIndex: 50 }}
            >
               <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=500" alt="Pasta" className="w-full h-full object-cover" />
            </motion.div>
            
            {/* 4. Healthy Bowl (Bottom Center) */}
            <motion.div 
               className="absolute bottom-0 left-20 md:left-32 w-60 h-60 md:w-72 md:h-72 rounded-[45px] overflow-hidden border-4 border-white/5 shadow-2xl z-30"
               animate={{ y: [15, -15, 15] }}
               transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
               whileHover={{ scale: 1.05, zIndex: 50 }}
            >
               <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600" alt="Bowl" className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Floating Badges */}
            <motion.div 
              className="absolute top-10 right-[-10px] bg-card/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl z-40 flex items-center gap-3"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
               <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
                  <Star className="w-5 h-5 fill-current" />
               </div>
               <div>
                  <p className="text-white font-bold text-xs">Healthy Choices</p>
                  <p className="text-paragraph text-[10px]">Over 20+ fresh salads</p>
               </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-10 left-[-10px] bg-card/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl z-40 flex items-center gap-3"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
               <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <Info className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-white font-bold text-xs">Artisan Coffee</p>
                  <p className="text-paragraph text-[10px]">Freshly brewed beans</p>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>



      {/* Menu Navigation / Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h3 className="text-white font-black text-3xl uppercase tracking-tighter">Explore <span className="text-primary">Menu</span></h3>
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">

        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2",
              selectedCategory === cat 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30" 
                : "bg-white/5 text-paragraph hover:bg-white/10 hover:text-white border-white/10"
            )}
          >
            {cat}
          </button>
        ))}
        </div>
      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <GlassCard key={item.id} className="p-0 overflow-hidden group flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
            {/* Image Section */}
            <div className="relative h-56 bg-white/5 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                {item.image && item.image.startsWith('http') ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">{item.image || "🍴"}</span>
                )}
              </div>
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border",
                  item.category === 'Veg' ? "bg-green-500/20 text-green-400 border-green-500/20" : 
                  item.category === 'Non-Veg' ? "bg-red-500/20 text-red-400 border-red-500/20" : 
                  "bg-blue-500/20 text-blue-400 border-blue-500/20"
                )}>
                  {item.category}
                </span>
              </div>
              <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-red-500 hover:bg-white/10 transition-all">
                <Heart className="w-5 h-5" />
              </button>
              
              {!item.available && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center z-10">
                  <span className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg font-black uppercase tracking-widest rotate-[-10deg]">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
               <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                  <span className="text-[10px] text-paragraph ml-2 uppercase font-bold">4.9 (120+ orders)</span>
               </div>
              <h3 className="text-white font-bold text-xl leading-tight mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
              <p className="text-paragraph text-sm line-clamp-2 mb-6 leading-relaxed">{item.description || "A delicious campus favorite prepared fresh daily."}</p>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-paragraph text-[10px] uppercase font-bold tracking-widest">Price</span>
                  <span className="text-white font-black text-2xl">₹{item.price}</span>
                </div>
                <button 
                  disabled={!item.available}
                  onClick={() => onAddToCart(item)}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                    item.available 
                      ? "bg-primary text-white hover:scale-110 shadow-primary/20 hover:rotate-6" 
                      : "bg-white/5 text-paragraph opacity-50 cursor-not-allowed"
                  )}
                >
                  {item.available ? <Plus className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default MenuDisplay;
