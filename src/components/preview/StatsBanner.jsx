import React from 'react';
import { Award, Briefcase, GraduationCap, CheckCircle2, TrendingUp } from 'lucide-react';

export function StatsBanner({ data }) {
  const experiences = data.experience || [];
  const educations = data.education || [];
  const projects = data.projects || [];
  const certifications = data.certifications || [];
  
  // Calculate dynamic data stats
  const totalBullets = experiences.reduce((acc, job) => acc + (job.bullets?.length || 0), 0);
  
  const skillCount = (data.skills?.languages ? data.skills.languages.split(',').length : 0) +
                     (data.skills?.frameworks ? data.skills.frameworks.split(',').length : 0) +
                     (data.skills?.tools ? data.skills.tools.split(',').length : 0) +
                     (data.skills?.databases ? data.skills.databases.split(',').length : 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center select-none">
      
      {/* Exp stat */}
      <div className="p-4 rounded border border-cyber-border/40 bg-slate-950/40 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute top-1 right-2 opacity-15">
          <Briefcase className="w-8 h-8 text-cyber-accent" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Job Nodes</span>
        <span className="text-xl font-black text-white neon-text-glow block">
          {experiences.length}
        </span>
        <span className="text-[8px] text-cyber-neon uppercase tracking-widest font-extrabold mt-0.5 block">
          {totalBullets} Ach. Bullets
        </span>
      </div>

      {/* Skills stat */}
      <div className="p-4 rounded border border-cyber-border/40 bg-slate-950/40 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-1 right-2 opacity-15">
          <TrendingUp className="w-8 h-8 text-cyber-accent" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Keywords</span>
        <span className="text-xl font-black text-white neon-text-glow block">
          {skillCount}
        </span>
        <span className="text-[8px] text-cyber-neon uppercase tracking-widest font-extrabold mt-0.5 block">
          ATS-Optimized
        </span>
      </div>

      {/* Projects stat */}
      <div className="p-4 rounded border border-cyber-border/40 bg-slate-950/40 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-1 right-2 opacity-15">
          <GraduationCap className="w-8 h-8 text-cyber-accent" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Projects Logged</span>
        <span className="text-xl font-black text-white neon-text-glow block">
          {projects.length}
        </span>
        <span className="text-[8px] text-cyber-neon uppercase tracking-widest font-extrabold mt-0.5 block">
          Metrics Attached
        </span>
      </div>

      {/* Certs stat */}
      <div className="p-4 rounded border border-cyber-border/40 bg-slate-950/40 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-1 right-2 opacity-15">
          <Award className="w-8 h-8 text-cyber-accent" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Credentials</span>
        <span className="text-xl font-black text-white neon-text-glow block">
          {certifications.length}
        </span>
        <span className="text-[8px] text-cyber-neon uppercase tracking-widest font-extrabold mt-0.5 block">
          Issuer Validated
        </span>
      </div>

    </div>
  );
}
