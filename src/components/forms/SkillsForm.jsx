import React from 'react';
import { ShieldAlert, Terminal, Layers, Settings, Database, Sliders } from 'lucide-react';

export function SkillsForm({ data, onChange }) {
  const normalizeSkillField = (field) => {
    if (!field) return '';
    if (Array.isArray(field)) return field.filter(Boolean).join(', ');
    return field;
  };

  const skills = {
    languages: normalizeSkillField(data.skills?.languages),
    frameworks: normalizeSkillField(data.skills?.frameworks),
    tools: normalizeSkillField(data.skills?.tools),
    databases: normalizeSkillField(data.skills?.databases)
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      skills: {
        ...skills,
        [name]: value
      }
    });
  };

  // Convert comma-separated string to an array for preview tag displays
  const getTags = (skillStr) => {
    if (!skillStr) return [];
    return skillStr
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="border-b border-cyber-border/40 pb-2">
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest flex items-center select-none">
          <Sliders className="w-4 h-4 mr-2" />
          Categorical Skill Parameters
        </h4>
        <p className="text-[9px] text-slate-500 uppercase mt-1">
          Provide comma-separated tech tokens to classify your primary skill sets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Languages */}
        <div className="p-4 rounded border border-cyber-border/30 bg-slate-950/20 space-y-3">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider flex items-center">
            <Terminal className="w-4 h-4 mr-1.5 text-cyber-accent" />
            Programming Languages
          </label>
          <input
            type="text"
            name="languages"
            value={skills.languages || ''}
            onChange={handleSkillChange}
            placeholder="e.g. JavaScript, TypeScript, Python, Rust, Go"
            className="w-full bg-slate-950/80 border border-cyber-border/60 rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
          />
          {getTags(skills.languages).length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {getTags(skills.languages).map((tag, i) => (
                <span key={i} className="text-[9px] text-cyber-neon bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Frameworks */}
        <div className="p-4 rounded border border-cyber-border/30 bg-slate-950/20 space-y-3">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider flex items-center">
            <Layers className="w-4 h-4 mr-1.5 text-cyber-accent" />
            Frameworks & Libraries
          </label>
          <input
            type="text"
            name="frameworks"
            value={skills.frameworks || ''}
            onChange={handleSkillChange}
            placeholder="e.g. React, Next.js, FastAPI, NestJS, Tailwind CSS"
            className="w-full bg-slate-950/80 border border-cyber-border/60 rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
          />
          {getTags(skills.frameworks).length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {getTags(skills.frameworks).map((tag, i) => (
                <span key={i} className="text-[9px] text-cyber-neon bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tools */}
        <div className="p-4 rounded border border-cyber-border/30 bg-slate-950/20 space-y-3">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider flex items-center">
            <Settings className="w-4 h-4 mr-1.5 text-cyber-accent" />
            DevOps & Tooling
          </label>
          <input
            type="text"
            name="tools"
            value={skills.tools || ''}
            onChange={handleSkillChange}
            placeholder="e.g. Git, Docker, Kubernetes, AWS, GitHub Actions"
            className="w-full bg-slate-950/80 border border-cyber-border/60 rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
          />
          {getTags(skills.tools).length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {getTags(skills.tools).map((tag, i) => (
                <span key={i} className="text-[9px] text-cyber-neon bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Databases */}
        <div className="p-4 rounded border border-cyber-border/30 bg-slate-950/20 space-y-3">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider flex items-center">
            <Database className="w-4 h-4 mr-1.5 text-cyber-accent" />
            Databases & Storage
          </label>
          <input
            type="text"
            name="databases"
            value={skills.databases || ''}
            onChange={handleSkillChange}
            placeholder="e.g. PostgreSQL, Redis, MongoDB, DynamoDB, ElasticSearch"
            className="w-full bg-slate-950/80 border border-cyber-border/60 rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
          />
          {getTags(skills.databases).length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {getTags(skills.databases).map((tag, i) => (
                <span key={i} className="text-[9px] text-cyber-neon bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="p-3.5 rounded border border-amber-500/20 bg-amber-500/5 flex items-start space-x-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-[9px] leading-relaxed text-amber-500/80 uppercase">
          Note: An optimized skill inventory increases parser match rates. Specify languages and technologies you have worked with extensively first.
        </p>
      </div>

    </div>
  );
}
