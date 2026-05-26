import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { StatsBanner } from '../components/preview/StatsBanner';
import { CodePreview } from '../components/preview/CodePreview';
import { Button } from '../components/ui/Button';
import { openInOverleaf } from '../lib/overleaf';
import { downloadTexFile } from '../utils/downloadTex';
import { copyToClipboard } from '../utils/copyToClipboard';
import { ExternalLink, Download, Copy, Edit2, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export function ResultPage({ 
  resumeJson, 
  latex, 
  onLatexChange, 
  onEdit, 
  onRegenerate,
  setToast
}) {
  const [copied, setCopied] = useState(false);

  const candidateName = resumeJson?.name || 'candidate';

  const handleOpenOverleaf = () => {
    const success = openInOverleaf(latex, candidateName);
    if (success) {
      setToast({
        visible: true,
        message: 'Syncing assets... Redirecting to Overleaf sandbox.',
        type: 'success'
      });
    } else {
      setToast({
        visible: true,
        message: 'Popup Blocked! Please allow popups for this site.',
        type: 'error'
      });
    }
  };

  const handleDownload = () => {
    const success = downloadTexFile(latex, candidateName);
    if (success) {
      setToast({
        visible: true,
        message: 'File downloaded: check your browser downloads.',
        type: 'success'
      });
    } else {
      setToast({
        visible: true,
        message: 'Failed to download file.',
        type: 'error'
      });
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(latex);
    if (success) {
      setCopied(true);
      setToast({
        visible: true,
        message: 'LaTeX source copied to clipboard!',
        type: 'success'
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      setToast({
        visible: true,
        message: 'Failed to copy to clipboard.',
        type: 'error'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono animate-fade-in select-none">
      
      {/* Dynamic Success Alert Banner */}
      <div className="p-4 rounded border border-cyber-accent bg-cyber-accent/5 flex items-start space-x-3.5 shadow-[0_0_20px_rgba(0,212,170,0.15)] relative overflow-hidden">
        <div className="p-2 rounded bg-cyber-accent/15 border border-cyber-accent">
          <CheckCircle2 className="w-5 h-5 text-cyber-neon" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <h2 className="text-xs uppercase text-white font-extrabold tracking-widest">
              COMPILER EXECUTED: SUCCESS
            </h2>
            <span className="text-[8px] bg-cyber-accent/25 border border-cyber-accent text-cyber-neon px-1.5 py-0.5 rounded uppercase tracking-wider font-extrabold select-none">
              Compliant
            </span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase leading-relaxed mt-1">
            Gemini successfully parsed and quantified achievements matching technical ATS filters. 
            The compilable moderncv LaTeX document is prepared for instant deployment.
          </p>
        </div>
      </div>

      {/* Aggregate Stats */}
      <StatsBanner data={resumeJson} />

      {/* AI ATS Assessment Card */}
      {resumeJson?.atsAssessment && (
        <Card title="AI_ATS_SCORER: // MATCH_REPORT" glow={true}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono select-none">
            
            {/* Score Ring */}
            <div className="flex flex-col items-center justify-center p-4 border-r border-cyber-border/40 text-center">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold mb-3">
                ATS Compatibility Match
              </span>
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* SVG Circular Track */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="rgba(0, 212, 170, 0.05)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="#00d4aa"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="301.6"
                    strokeDashoffset={301.6 - (301.6 * (resumeJson.atsAssessment.score || 85)) / 100}
                    className="shadow-[0_0_15px_rgba(0,255,200,0.5)] transition-all duration-500"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-white neon-text-glow">
                    {resumeJson.atsAssessment.score || 85}%
                  </span>
                  <span className="text-[7px] uppercase tracking-widest text-cyber-neon font-black block mt-0.5">
                    Match Grade
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Optimizations */}
            <div className="p-2 space-y-3 md:col-span-2">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-cyber-neon font-extrabold block mb-2 border-b border-cyber-border/40 pb-1">
                  Passed ATS System Checks
                </span>
                <ul className="space-y-1.5 text-[9px] uppercase leading-relaxed text-slate-300">
                  {(resumeJson.atsAssessment.feedback || []).map((fb, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-cyber-neon font-bold">✓</span>
                      <span>{fb}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {resumeJson.atsAssessment.missingKeywords && resumeJson.atsAssessment.missingKeywords.length > 0 && (
                <div className="pt-2">
                  <span className="text-[9px] uppercase tracking-wider text-amber-500 font-extrabold block mb-2 border-b border-amber-500/20 pb-1">
                    Identified Skill Gaps / Missing Keywords
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeJson.atsAssessment.missingKeywords.map((kw, i) => (
                      <span key={i} className="text-[8px] text-amber-500 bg-amber-500/5 px-2 py-0.5 border border-amber-500/20 rounded font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </Card>
      )}

      {/* Primary Action Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <Button
          onClick={handleOpenOverleaf}
          variant="primary"
          icon={ExternalLink}
          className="bg-gradient-to-r from-cyber-accent to-cyber-neon text-cyber-bg hover:brightness-110 shadow-[0_0_15px_rgba(0,255,200,0.2)]"
        >
          Open in Overleaf
        </Button>

        <Button
          onClick={handleCopy}
          variant="secondary"
          icon={copied ? CheckCircle2 : Copy}
        >
          {copied ? 'Copied!' : 'Copy LaTeX'}
        </Button>

        <Button
          onClick={handleDownload}
          variant="secondary"
          icon={Download}
        >
          Download .tex
        </Button>

        <Button
          onClick={onEdit}
          variant="secondary"
          icon={Edit2}
        >
          Edit Wizard
        </Button>

        <Button
          onClick={onRegenerate}
          variant="danger"
          icon={RefreshCw}
        >
          Regenerate
        </Button>
      </div>

      {/* Code Viewer wrapper card */}
      <Card title="RESOURCES_COMPILER: // VIEW_ASSETS" glow={false}>
        <CodePreview 
          latex={latex} 
          json={resumeJson} 
          onLatexChange={onLatexChange} 
        />
      </Card>

      {/* Overleaf Popup Notice */}
      <div className="p-3.5 rounded border border-cyber-border bg-slate-950/40 flex items-start space-x-2.5 shadow-md">
        <ShieldAlert className="w-5 h-5 text-cyber-neon flex-shrink-0 mt-0.5" />
        <p className="text-[9px] leading-relaxed text-slate-400 uppercase select-none">
          Notice: Opening in Overleaf triggers a new browser window target. If nothing occurs, please click the 
          popups icon in your browser URL block bar and authorize popups for this developer sandbox site.
        </p>
      </div>

    </div>
  );
}
