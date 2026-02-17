import React from 'react';
import UserNavbar from './UserNavbar';
import { motion, AnimatePresence } from 'framer-motion';

const UserLayout = ({ children, cartCount, onOpenCart, showNavAndFooter = true, onNavigate }) => {
  return (
    <div className="min-h-screen text-white selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      {/* Persistent Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0c0b10]" />
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full -z-10" />
      <div className="fixed top-[40%] left-[20%] w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full -z-10" />

      {showNavAndFooter && (
        <UserNavbar 
          cartCount={cartCount} 
          onOpenCart={onOpenCart} 
          onOpenProfile={() => {}} 
          onOpenMenu={() => {}}
          onNavigate={onNavigate}
        />
      )}
      
      <main className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {showNavAndFooter && (
        <footer id="about" className="py-20 px-6 border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <span className="text-white font-black italic">S</span>
                </div>
                <span className="text-white font-bold text-xl">Smart Café</span>
              </div>
              <p className="text-paragraph leading-relaxed">
                Making your campus life better, one meal at a time. The most advanced cafeteria experience in 2026.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-paragraph text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Menu Selection</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Order Status</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">My Profile</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Student Loyalty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Categories</h4>
              <ul className="space-y-4 text-paragraph text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Healthy Salads</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Main Course</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Summer Drinks</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Quick Snacks</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-paragraph text-sm mb-4">Get updates on today's specials and discounts.</p>
              <div className="relative group">
                 <input type="email" placeholder="Your email..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-all pr-12" />
                 <button className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-lg flex items-center justify-center">
                    →
                 </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-paragraph text-xs">
            © 2026 Smart Cafeteria Management System. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
};

export default UserLayout;
