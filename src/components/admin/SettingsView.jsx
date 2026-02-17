import React from 'react';
import GlassCard from './GlassCard';
import { Settings as SettingsIcon, Bell, Shield, Coffee, Mail, Percent, MapPin } from 'lucide-react';

const SettingsView = ({ settings, setSettings }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl font-bold">System Settings</h1>
        <p className="text-paragraph mt-1">Configure your cafeteria's identity and operational rules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Settings */}
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <Coffee className="w-5 h-5" />
             </div>
             <h3 className="text-white font-bold text-lg">General Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-paragraph text-sm font-medium ml-1">Cafeteria Name</label>
              <input 
                type="text" 
                className="w-full bg-background/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-all"
                value={settings.cafeteriaName}
                onChange={(e) => setSettings({...settings, cafeteriaName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-paragraph text-sm font-medium ml-1">Contact Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph group-focus-within:text-primary w-4 h-4" />
                <input 
                  type="email" 
                  className="w-full bg-background/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                  value="admin@smartcafe.io"
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-paragraph text-sm font-medium ml-1">Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph group-focus-within:text-primary w-4 h-4" />
                <input 
                  type="text" 
                  className="w-full bg-background/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                  value="Main Campus Block A"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Operational Settings */}
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center">
                <Shield className="w-5 h-5" />
             </div>
             <h3 className="text-white font-bold text-lg">Operations</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-paragraph text-sm font-medium ml-1 flex items-center gap-2">
                <Percent className="w-4 h-4" /> Tax Percentage (%)
              </label>
              <input 
                type="number" 
                className="w-full bg-background/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary transition-all"
                value={settings.taxPercentage}
                onChange={(e) => setSettings({...settings, taxPercentage: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <p className="text-white font-medium">Auto-Confirm Orders</p>
                <p className="text-paragraph text-xs">Orders will be automatically marked as preparing.</p>
              </div>
              <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer border border-primary/30">
                <div className="absolute left-1 top-1 w-4 h-4 bg-primary rounded-full translate-x-6"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <p className="text-white font-medium">Night Mode Operations</p>
                <p className="text-paragraph text-xs">Enable late-night surcharge and limited menu.</p>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer border border-white/10">
                <div className="absolute left-1 top-1 w-4 h-4 bg-paragraph rounded-full"></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
          Reset Defaults
        </button>
        <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
