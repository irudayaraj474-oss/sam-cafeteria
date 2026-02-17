import { Search, Bell, Menu, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const AdminNavbar = ({ onToggleSidebar, isMuted, setIsMuted, adminName = "Canteen Manager", adminRole = "Super Admin" }) => {
  return (
    <header className="h-20 bg-card/30 backdrop-blur-md border-b border-white/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 md:gap-8 flex-1">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-sm group hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph group-focus-within:text-primary transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search orders, menu..." 
            className="w-full bg-background/50 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-paragraph/50"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2">
          {/* Mute Toggle */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
              isMuted ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-white/5 text-white border-white/10 hover:bg-white/10 focus:ring-4 focus:ring-white/5"
            )}
            title={isMuted ? "Unmute Notifications" : "Mute Notifications"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button className="w-10 h-10 rounded-full flex items-center justify-center text-paragraph hover:bg-white/5 hover:text-white transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
          </button>
        </div>

        <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden md:block">
            <h4 className="text-white text-sm font-semibold">{adminName}</h4>
            <p className="text-paragraph text-xs">{adminRole}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary/20 to-primary/40 border border-primary/30 flex items-center justify-center text-primary font-bold overflow-hidden">
            {adminName.split(' ').map(n => n[0]).join('')}
          </div>
          <ChevronDown className="w-4 h-4 text-paragraph group-hover:text-white transition-all hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
