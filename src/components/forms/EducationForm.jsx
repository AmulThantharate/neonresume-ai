import React from 'react';
import { Plus, Trash2, GraduationCap, Calendar, Award } from 'lucide-react';
import { Button } from '../ui/Button';

export function EducationForm({ data, onChange }) {
  const educations = data.education || [];

  const handleEducationChange = (index, field, value) => {
    const updated = [...educations];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({ ...data, education: updated });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...educations,
        {
          school: '',
          degree: '',
          gpa: '',
          gradDate: ''
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    onChange({ ...data, education: updated });
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest flex items-center select-none">
          <GraduationCap className="w-4 h-4 mr-2" />
          Academic History Logs
        </h4>
        <Button onClick={addEducation} variant="primary" size="sm" icon={Plus}>
          Add Record
        </Button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-cyber-border/30 rounded-md bg-slate-950/20">
          <p className="text-xs text-slate-500 uppercase tracking-widest">No academic listings defined.</p>
          <button
            type="button"
            onClick={addEducation}
            className="mt-3 text-xs text-cyber-accent hover:text-cyber-neon font-bold underline cursor-pointer"
          >
            Click here to initialize first school item
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div 
              key={index} 
              className="p-5 rounded border border-cyber-border/50 bg-slate-950/30 relative space-y-4 hover:border-cyber-accent/30 transition-colors duration-200"
            >
              {/* Delete School Button */}
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute top-4 right-4 p-1.5 rounded border border-transparent hover:border-red-500/30 hover:bg-red-500/10 text-slate-500 hover:text-cyber-red transition-all duration-150"
                title="Remove Education Block"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <span className="text-[10px] text-cyber-accent font-extrabold uppercase bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                Education Entry #{index + 1}
              </span>

              {/* Input grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">School / University *</label>
                  <input
                    type="text"
                    required
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Degree & Major *</label>
                  <input
                    type="text"
                    required
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    placeholder="e.g. M.S. in Software Engineering"
                    className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Cumulative GPA (Optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                      placeholder="e.g. 3.91 / 4.00"
                      className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200 pr-8"
                    />
                    <Award className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Graduation Date *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={edu.gradDate}
                      onChange={(e) => handleEducationChange(index, 'gradDate', e.target.value)}
                      placeholder="e.g. June 2021"
                      className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200 pr-8"
                    />
                    <Calendar className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
