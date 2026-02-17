import React, { useState } from 'react';
import { Plus, Edit, Trash2, Camera, ToggleLeft, ToggleRight, Search } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '../../lib/utils';

const MenuManagementView = ({ menuItems, onAddItem, onEditItem, onDeleteItem, onToggleAvailability }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Veg', 'Non-Veg', 'Drinks', 'Snacks'];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-bold">Menu Management</h1>
          <p className="text-paragraph text-sm md:text-base mt-1">Manage your food items, prices, and availability.</p>
        </div>
        <button 
          onClick={onAddItem}
          className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add Food Item
        </button>
      </div>

      {/* Filters */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative grow group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph group-focus-within:text-primary transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search food by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                selectedCategory === cat 
                  ? "bg-primary text-white" 
                  : "bg-white/5 text-paragraph hover:bg-white/10 hover:text-white border border-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <GlassCard key={item.id} className="p-0 overflow-hidden group flex flex-col h-full">
            {/* Image Placeholder / Display */}
            <div className="relative h-48 bg-white/5 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {item.image && item.image.startsWith('http') ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">{item.image || "🍴"}</span>
                )}
              </div>
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border",
                  item.category === 'Veg' ? "bg-green-500/20 text-green-400 border-green-500/20" : 
                  item.category === 'Non-Veg' ? "bg-red-500/20 text-red-400 border-red-500/20" : 
                  "bg-blue-500/20 text-blue-400 border-blue-500/20"
                )}>
                  {item.category}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onEditItem(item)}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDeleteItem(item.id)}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
                <span className="text-primary font-bold text-lg">₹{item.price}</span>
              </div>
              <p className="text-paragraph text-sm line-clamp-2 mb-6">{item.description || "No description available."}</p>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                <span className={cn(
                  "text-xs font-semibold uppercase tracking-wider",
                  item.available ? "text-secondary" : "text-paragraph"
                )}>
                  {item.available ? "Available" : "Out of Stock"}
                </span>
                <button 
                  onClick={() => onToggleAvailability(item.id)}
                  className={cn(
                    "transition-colors",
                    item.available ? "text-secondary" : "text-paragraph"
                  )}
                >
                  {item.available ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
        
        {/* Add New Quick Card */}
        <button 
          onClick={onAddItem}
          className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-paragraph hover:border-primary hover:text-primary transition-all group min-h-[350px]"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-bold">Add New Item</span>
        </button>
      </div>
    </div>
  );
};

export default MenuManagementView;
