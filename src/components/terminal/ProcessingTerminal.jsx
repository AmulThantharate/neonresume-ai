import React, { useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu, RefreshCw } from 'lucide-react';

export function ProcessingTerminal({ logs, progress }) {
  const terminalEndRef = useRef(null);

  // Auto-scroll terminal container
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getLogColorClass = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400 font-extrabold';
      case 'success-cyan':
        return 'text-cyber-neon font-black';
      case 'warning':
        return 'text-amber-500 font-medium animate-pulse';
      case 'error':
        return 'text-cyber-red font-black uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded border border-cyber-red/20';
      case 'command':
        return 'text-white font-extrabold text-xs tracking-wide';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* Dynamic Terminal Box */}
      <div className="rounded-lg border border-cyber-border/70 overflow-hidden shadow-2xl relative bg-cyber-darker/90 backdrop-blur-md">
        
        {/* Terminal Header */}
        <div className="bg-[#040608] px-4 py-2.5 border-b border-cyber-border/50 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-cyber-neon" />
            <span className="text-[10px] text-cyber-accent uppercase tracking-widest font-black">
              NEONRESUME_TERM: // AI_PIPELINE
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-[8px] text-cyber-accent/80">
              <Cpu className="w-3 h-3 mr-1 animate-pulse" />
              CPU_LOAD: 2.4%
            </span>
            <span className="flex items-center text-[8px] text-cyber-neon bg-cyber-accent/10 border border-cyber-accent/30 rounded px-1.5 py-0.5">
              SECURE_SSL
            </span>
          </div>
        </div>

        {/* Console Log List */}
        <div className="h-96 overflow-y-auto p-5 space-y-2.5 select-text font-mono text-[10px] leading-relaxed relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950/20 via-cyber-bg/95 to-cyber-bg">
          
          {/* CRT Scanline Glitch Grid Decorator */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(0,212,170,1)_95%)] bg-[length:100%_4px]" />

          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-2 animate-fade-in">
              <span className="text-slate-600 flex-shrink-0 select-none">[{log.timestamp}]</span>
              <span className={`flex-shrink-0 select-none ${log.type === 'error' ? 'text-cyber-red' : 'text-cyber-accent'}`}>
                {log.type === 'command' ? '$' : '>>'}
              </span>
              <span className={getLogColorClass(log.type)}>
                {log.text}
              </span>
            </div>
          ))}

          {/* Active indicator blinking cursor */}
          <div className="flex items-center space-x-2 text-cyber-neon font-black">
            <span>&gt; pipeline daemon executing...</span>
            <span className="w-1.5 h-3.5 bg-cyber-neon inline-block animate-text-blink" />
          </div>

          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Progress Telemetry */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] uppercase text-slate-400 tracking-wider">
          <span className="flex items-center font-bold">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-cyber-neon animate-spin" />
            AI COMPILING PROGRESS
          </span>
          <span className="text-cyber-neon font-black">{progress}%</span>
        </div>

        {/* Glass Glow Progress Bar */}
        <div className="w-full bg-slate-950 border border-cyber-border rounded-full h-3 overflow-hidden p-[2px] shadow-[inset_0_0_5px_rgba(0,0,0,0.8)]">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyber-accent to-cyber-neon shadow-[0_0_10px_rgba(0,255,200,0.5)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}
