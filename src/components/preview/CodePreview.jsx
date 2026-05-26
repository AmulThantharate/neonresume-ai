import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import latex from 'react-syntax-highlighter/dist/esm/languages/hljs/latex';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FileCode, Braces, Edit3, Eye, Copy, Check } from 'lucide-react';

SyntaxHighlighter.registerLanguage('latex', latex);
SyntaxHighlighter.registerLanguage('json', json);

export function CodePreview({ latex, json, onLatexChange }) {
  const [activeTab, setActiveTab] = useState('latex'); // 'latex' | 'json'
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = activeTab === 'latex' ? latex : JSON.stringify(json, null, 2);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code block:', err);
    }
  };

  return (
    <div className="space-y-4 font-mono">
      
      {/* Code Editor Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-cyber-border/40 pb-3">
        
        {/* Tab triggers */}
        <div className="flex space-x-2 bg-slate-950 p-1 rounded border border-slate-800">
          <button
            onClick={() => { setActiveTab('latex'); setIsEditing(false); }}
            className={`flex items-center px-3 py-1.5 rounded text-xs transition-colors duration-150 uppercase tracking-widest font-black ${
              activeTab === 'latex'
                ? 'bg-cyber-accent/15 border border-cyber-accent/40 text-cyber-neon'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 mr-1.5" />
            LaTeX Source
          </button>
          <button
            onClick={() => { setActiveTab('json'); setIsEditing(false); }}
            className={`flex items-center px-3 py-1.5 rounded text-xs transition-colors duration-150 uppercase tracking-widest font-black ${
              activeTab === 'json'
                ? 'bg-cyber-accent/15 border border-cyber-accent/40 text-cyber-neon'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Braces className="w-3.5 h-3.5 mr-1.5" />
            ATS JSON
          </button>
        </div>

        {/* Action controllers */}
        <div className="flex items-center space-x-2">
          {activeTab === 'latex' && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center px-3 py-1.5 rounded border text-xs transition-colors ${
                isEditing
                  ? 'bg-cyber-accent/10 border-cyber-accent text-cyber-neon'
                  : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-white'
              }`}
            >
              {isEditing ? (
                <>
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  View Preview
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                  Edit LaTeX
                </>
              )}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-slate-400 hover:text-white text-xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-cyber-neon" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy Output
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor & Viewer Terminal body */}
      <div className="border border-cyber-border rounded-md overflow-hidden relative shadow-2xl bg-cyber-bg/95">
        
        {/* Decorative code tags */}
        <div className="absolute top-2.5 right-4 z-20 text-[8px] text-cyber-accent/30 tracking-widest uppercase select-none pointer-events-none">
          {activeTab === 'latex' ? 'FILE: resume.tex' : 'FILE: schema.json'}
        </div>

        {activeTab === 'latex' && isEditing ? (
          // Live code editing environment
          <textarea
            value={latex}
            onChange={(e) => onLatexChange(e.target.value)}
            className="w-full h-[450px] bg-[#0c1015] text-[#c9d1d9] p-5 font-mono text-xs leading-relaxed outline-none resize-none select-text border-none focus:ring-1 focus:ring-cyber-accent/30"
            spellCheck="false"
          />
        ) : (
          // Dynamic Syntax-highlighted environment
          <div className="h-[450px] overflow-auto text-xs font-mono leading-relaxed select-text bg-[#0c1015]">
            <SyntaxHighlighter
              language={activeTab === 'latex' ? 'latex' : 'json'}
              style={atomOneDark}
              customStyle={{
                margin: 0,
                padding: '20px',
                background: '#0c1015',
                fontSize: '11px',
                lineHeight: '1.6'
              }}
            >
              {activeTab === 'latex' ? latex : JSON.stringify(json, null, 2)}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

    </div>
  );
}
