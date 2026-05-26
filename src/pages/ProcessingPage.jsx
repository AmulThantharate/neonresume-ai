import React from 'react';
import { Card } from '../components/ui/Card';
import { ProcessingTerminal } from '../components/terminal/ProcessingTerminal';
import { ShieldCheck, Server } from 'lucide-react';

export function ProcessingPage({ logs, progress }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono select-none">
      
      {/* Processing Status Banner */}
      <div className="p-4 rounded border border-cyber-accent bg-cyber-accent/5 flex items-start space-x-3.5 shadow-[0_0_15px_rgba(0,212,170,0.1)]">
        <div className="p-2 rounded bg-cyber-accent/10 border border-cyber-accent animate-pulse">
          <Server className="w-5 h-5 text-cyber-neon" />
        </div>
        <div className="flex-1">
          <h2 className="text-xs uppercase text-cyber-neon font-black tracking-widest animate-pulse">
            PIPELINE STATUS: EXECUTING GENERATOR DEPLOYMENT
          </h2>
          <p className="text-[10px] text-slate-400 uppercase leading-relaxed mt-1">
            Running double-stage Claude Sonnet operations. Handshaking, keyword-injection, metric-inference, 
            and moderncv LaTex templates are compiling asynchronously entirely in-browser. Please keep this tab active.
          </p>
        </div>
      </div>

      {/* Compiler terminal wrapper card */}
      <Card title="DAEMON_CONSOLE: // RUNTIME_MONITOR" glow={true}>
        <ProcessingTerminal logs={logs} progress={progress} />
      </Card>

    </div>
  );
}
