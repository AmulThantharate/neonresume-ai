import React from 'react';
import { Plus, Trash2, AlignLeft, Briefcase, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export function ExperienceForm({ data, onChange }) {
  const experiences = data.experience || [];

  const handleJobChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({ ...data, experience: updated });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...experiences,
        {
          company: '',
          role: '',
          duration: '',
          bullets: ['']
        }
      ]
    });
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    onChange({ ...data, experience: updated });
  };

  // Manage individual bullet strings inside experience[index].bullets[bulletIndex]
  const handleBulletChange = (index, bulletIndex, value) => {
    const updated = [...experiences];
    const updatedBullets = [...updated[index].bullets];
    updatedBullets[bulletIndex] = value;
    updated[index].bullets = updatedBullets;
    onChange({ ...data, experience: updated });
  };

  const addBullet = (index) => {
    const updated = [...experiences];
    updated[index].bullets = [...(updated[index].bullets || []), ''];
    onChange({ ...data, experience: updated });
  };

  const removeBullet = (index, bulletIndex) => {
    const updated = [...experiences];
    const updatedBullets = updated[index].bullets.filter((_, i) => i !== bulletIndex);
    updated[index].bullets = updatedBullets.length > 0 ? updatedBullets : [''];
    onChange({ ...data, experience: updated });
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest flex items-center select-none">
          <Briefcase className="w-4 h-4 mr-2" />
          Professional Experience Records
        </h4>
        <Button onClick={addExperience} variant="primary" size="sm" icon={Plus}>
          Add Record
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-cyber-border/30 rounded-md bg-slate-950/20">
          <p className="text-xs text-slate-500 uppercase tracking-widest">No experience logs initialized.</p>
          <button
            type="button"
            onClick={addExperience}
            className="mt-3 text-xs text-cyber-accent hover:text-cyber-neon font-bold underline cursor-pointer"
          >
            Click here to initialize first job entry
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="p-5 rounded border border-cyber-border/50 bg-slate-950/30 relative space-y-4 hover:border-cyber-accent/30 transition-colors duration-200"
            >
              {/* Delete Job Button */}
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 p-1.5 rounded border border-transparent hover:border-red-500/30 hover:bg-red-500/10 text-slate-500 hover:text-cyber-red transition-all duration-150"
                title="Remove Experience Block"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <span className="text-[10px] text-cyber-accent font-extrabold uppercase bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                Job Entry #{index + 1}
              </span>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={exp.company}
                    onChange={(e) => handleJobChange(index, 'company', e.target.value)}
                    placeholder="e.g. Google LLC"
                    className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Job Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={exp.role}
                    onChange={(e) => handleJobChange(index, 'role', e.target.value)}
                    placeholder="e.g. Lead Devops Architect"
                    className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Duration *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={exp.duration}
                      onChange={(e) => handleJobChange(index, 'duration', e.target.value)}
                      placeholder="e.g. June 2023 - Present"
                      className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200 pr-8"
                    />
                    <Calendar className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Achievements dynamic list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] uppercase text-slate-400 flex items-center">
                    <AlignLeft className="w-3.5 h-3.5 mr-1 text-cyber-accent" />
                    Quantified Achievements & Highlights
                  </label>
                  <button
                    type="button"
                    onClick={() => addBullet(index)}
                    className="text-[9px] text-cyber-accent hover:text-cyber-neon uppercase tracking-wider flex items-center font-bold"
                  >
                    <Plus className="w-3 h-3 mr-0.5" />
                    Add Bullet
                  </button>
                </div>

                <div className="space-y-2">
                  {(exp.bullets || ['']).map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-center space-x-2">
                      <span className="text-cyber-accent/60 text-xs select-none font-bold">&gt;</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleBulletChange(index, bulletIdx, e.target.value)}
                        placeholder="e.g. Spearheaded React core migration, reducing FCP latency by 35% and increasing retention metrics by 12%."
                        className="w-full bg-slate-950/50 border border-cyber-border/60 hover:border-cyber-accent/30 focus:border-cyber-accent rounded px-3 py-1.5 text-xs text-slate-200 outline-none transition-all duration-150"
                      />
                      {(exp.bullets || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBullet(index, bulletIdx)}
                          className="p-1 rounded text-slate-500 hover:text-cyber-red hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
