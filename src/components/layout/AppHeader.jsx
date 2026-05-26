import React, { useState } from 'react';
import { Key, Eye, EyeOff, ShieldCheck, Terminal } from 'lucide-react';

export function AppHeader({ apiKey, onApiKeyChange }) {
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);

  const hasEnvKey = !!import.meta.env.VITE_GEMINI_API_KEY;

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border bg-cyber-bg/85 backdrop-blur-cyber py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3.5 select-none cursor-pointer">
          <div className="p-2 rounded bg-cyber-accent/10 border border-cyber-accent animate-pulse-glow">
            <Terminal className="w-5 h-5 text-cyber-neon" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black tracking-widest text-white uppercase neon-text-glow">
                NeonResume <span className="text-cyber-neon font-light">AI</span>
              </h1>
              <span className="text-[9px] bg-cyber-accent/15 border border-cyber-accent text-cyber-neon px-1.5 py-0.5 rounded font-extrabold tracking-widest">
                v1.0.0
              </span>
            </div>
            <p className="text-[9px] text-slate-500 tracking-wider uppercase">
              AI Resume Compiler & Optimizer
            </p>
          </div>
        </div>

        {/* API Settings Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5">
            {/* Status indicator */}
            {apiKey || hasEnvKey ? (
              <span className="flex items-center text-[10px] text-cyber-neon bg-cyber-accent/10 border border-cyber-accent/40 rounded px-2.5 py-1 uppercase tracking-wider font-extrabold select-none">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Gemini Active
              </span>
            ) : (
              <span className="flex items-center text-[10px] text-amber-500 bg-amber-500/10 border border-amber-500/30 rounded px-2.5 py-1 uppercase tracking-wider font-extrabold select-none animate-pulse">
                Gemini Offline
              </span>
            )}

            {/* Toggle Configuration Input */}
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={`p-2 rounded border transition-all duration-200 ${
                showKeyInput 
                  ? 'bg-cyber-accent/10 border-cyber-accent text-cyber-neon' 
                  : 'bg-slate-900 border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
              title="Configure API Key"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>

          {/* Key Input Field */}
          {showKeyInput && (
            <div className="flex items-center bg-slate-950 border border-cyber-border rounded-md overflow-hidden relative w-64 animate-fade-in shadow-lg">
              <input
                type={showKeyText ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder={hasEnvKey ? 'Using loaded .env file key' : 'Enter Gemini API Key...'}
                disabled={hasEnvKey}
                className="bg-transparent text-xs text-slate-200 py-2 pl-3 pr-8 w-full outline-none font-mono disabled:opacity-60 placeholder-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowKeyText(!showKeyText)}
                disabled={hasEnvKey}
                className="absolute right-2 text-slate-500 hover:text-slate-300 disabled:opacity-30"
              >
                {showKeyText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
