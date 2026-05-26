import React from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, Award } from 'lucide-react';

export function PersonalForm({ data, onChange }) {
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      personal: {
        ...(data.personal || {}),
        [name]: value
      }
    });
  };

  const handleTargetChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      targetRole: {
        ...(data.targetRole || {}),
        [name]: value
      }
    });
  };

  const personal = data.personal || {};
  const targetRole = data.targetRole || {};

  return (
    <div className="space-y-8 font-mono">
      
      {/* Target Role details */}
      <div>
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest border-b border-cyber-border/40 pb-2 mb-4 flex items-center">
          <Briefcase className="w-4 h-4 mr-2" />
          Target Alignment Details
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Desired Position</label>
            <input
              type="text"
              name="position"
              value={targetRole.position || ''}
              onChange={handleTargetChange}
              placeholder="e.g. Senior Software Engineer"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Target Industry</label>
            <input
              type="text"
              name="industry"
              value={targetRole.industry || ''}
              onChange={handleTargetChange}
              placeholder="e.g. Fintech, Healthcare"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Seniority Level</label>
            <select
              name="seniority"
              value={targetRole.seniority || ''}
              onChange={handleTargetChange}
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            >
              <option value="">Select Seniority...</option>
              <option value="Junior">Junior (0-2 YOE)</option>
              <option value="Mid">Mid-Level (2-5 YOE)</option>
              <option value="Senior">Senior (5-8 YOE)</option>
              <option value="Staff/Lead">Staff / Tech Lead (8+ YOE)</option>
              <option value="Executive">Executive (Director, VP, CTO)</option>
            </select>
          </div>
          
          {/* Target Job Description */}
          <div className="space-y-2 md:col-span-3">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Target Job Description (JD) (Optional - Tailors Keywords)</label>
            <textarea
              name="jobDescription"
              rows={3}
              value={targetRole.jobDescription || ''}
              onChange={handleTargetChange}
              placeholder="Paste the target job description here. The AI will analyze this JD to tailor your achievements, resume summary, and skill categories directly to this role."
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200 font-mono resize-y"
            />
          </div>
        </div>
      </div>

      {/* Personal/Contact Details */}
      <div>
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest border-b border-cyber-border/40 pb-2 mb-4 flex items-center">
          <User className="w-4 h-4 mr-2" />
          Primary Contact Metadata
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={personal.name || ''}
              onChange={handlePersonalChange}
              placeholder="Alex Rivera"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={personal.email || ''}
              onChange={handlePersonalChange}
              placeholder="alex.rivera@example.com"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={personal.phone || ''}
              onChange={handlePersonalChange}
              placeholder="+1 (555) 019-2834"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Geographic Location</label>
            <input
              type="text"
              name="location"
              value={personal.location || ''}
              onChange={handlePersonalChange}
              placeholder="San Francisco, CA"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              value={personal.linkedin || ''}
              onChange={handlePersonalChange}
              placeholder="linkedin.com/in/alex-rivera"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={personal.github || ''}
              onChange={handlePersonalChange}
              placeholder="github.com/alexrivera"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider">Portfolio Website</label>
            <input
              type="url"
              name="portfolio"
              value={personal.portfolio || ''}
              onChange={handlePersonalChange}
              placeholder="alexrivera.dev"
              className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest border-b border-cyber-border/40 pb-2 mb-4 flex items-center">
          <Award className="w-4 h-4 mr-2" />
          Core Executive Summary
        </h4>
        <textarea
          name="summary"
          rows={3}
          value={personal.summary || ''}
          onChange={handlePersonalChange}
          placeholder="e.g. Highly motivated senior developer specializing in large scale system design, React architectures, and distributed node networks. Proven history of optimizing infrastructure loads by 45% and managing teams up to 10+."
          className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-2.5 text-xs text-white outline-none focus:border-cyber-accent focus:shadow-[0_0_10px_rgba(0,212,170,0.1)] transition-all duration-200 font-mono resize-y"
        />
      </div>

    </div>
  );
}
