import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const UserHero = ({ onSearch, onBrowseMenu }) => {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex flex-col items-center justify-start text-center">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/20 blur-[180px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="inline-block px-8 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black uppercase tracking-[5px] mb-8">
            Digital Dining Experience
          </span>
          
          <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter mb-10">
            SMART<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-600 italic">CAFETERIA</span>
          </h1>

          <p className="text-paragraph text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Experience the next generation of campus dining. Order instantly, skip the queues, and enjoy fresh meals at your preferred table.
          </p>

          <motion.button 
            onClick={onBrowseMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-6 bg-primary text-white rounded-[24px] font-black text-2xl flex items-center justify-center gap-4 hover:shadow-[0_20px_50px_rgba(127,90,240,0.4)] transition-all shadow-xl shadow-primary/20 group"
          >
            GET STARTED 
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Hero Image Below */}
      <motion.div 
        className="w-full max-w-6xl mx-auto mt-24 relative px-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-[42px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl aspect-[21/9]">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200" 
              alt="Cafeteria Atmosphere" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 text-left">
              <div className="flex items-center gap-4 mb-2">
                 <div className="px-3 py-1 rounded-lg bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider">Campus Choice</div>
                 <div className="text-white/40 text-sm font-medium">Est. 2026</div>
              </div>
              <h3 className="text-3xl font-black text-white">The Heart of Campus Dining</h3>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default UserHero;
