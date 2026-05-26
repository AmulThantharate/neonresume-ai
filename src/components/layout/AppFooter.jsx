import React from 'react';
import { Cpu, Wifi, Activity } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t border-cyber-border bg-cyber-bg/40 backdrop-blur-md py-4 px-6 text-slate-500 font-mono text-[9px] uppercase tracking-wider relative select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-cyber-neon/80">
            <Wifi className="w-3.5 h-3.5" />
            <span>SYS_LINK: OPERATIONAL</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>COMPILER: moderncv v2.0</span>
          </div>
        </div>

        {/* Center branding */}
        <div className="text-center sm:text-right">
          <span className="text-slate-600">CLIENT SIDE RUNTIME // </span>
          <span className="text-cyber-accent font-semibold">NO DATA RETENTION</span>
        </div>

        {/* Right heartbeat */}
        <div className="flex items-center space-x-1.5 text-cyber-neon/60">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>DAEMON ALIVE</span>
        </div>

      </div>
    </footer>
  );
}
