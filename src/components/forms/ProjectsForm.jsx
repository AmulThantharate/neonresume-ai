import React from 'react';
import { Plus, Trash2, FolderOpen, Target, Terminal, Award } from 'lucide-react';
import { Button } from '../ui/Button';

export function ProjectsForm({ data, onChange }) {
  const projects = data.projects || [];

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({ ...data, projects: updated });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...projects,
        {
          name: '',
          stack: '',
          description: '',
          impact: ''
        }
      ]
    });
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange({ ...data, projects: updated });
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest flex items-center select-none">
          <FolderOpen className="w-4 h-4 mr-2" />
          Technical Projects Inventory
        </h4>
        <Button onClick={addProject} variant="primary" size="sm" icon={Plus}>
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-cyber-border/30 rounded-md bg-slate-950/20">
          <p className="text-xs text-slate-500 uppercase tracking-widest">No projects logged.</p>
          <button
            type="button"
            onClick={addProject}
            className="mt-3 text-xs text-cyber-accent hover:text-cyber-neon font-bold underline cursor-pointer"
          >
            Click here to initialize first project entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((proj, index) => (
            <div 
              key={index} 
              className="p-5 rounded border border-cyber-border/50 bg-slate-950/30 relative space-y-4 hover:border-cyber-accent/30 transition-colors duration-200"
            >
              {/* Delete Project Button */}
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 p-1.5 rounded border border-transparent hover:border-red-500/30 hover:bg-red-500/10 text-slate-500 hover:text-cyber-red transition-all duration-150"
                title="Remove Project Block"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <span className="text-[10px] text-cyber-accent font-extrabold uppercase bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                Project Entry #{index + 1}
              </span>

              {/* Input details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={proj.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    placeholder="e.g. Distributed Storage System"
                    className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Tech Stack *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={proj.stack}
                      onChange={(e) => handleProjectChange(index, 'stack', e.target.value)}
                      placeholder="e.g. Go, gRPC, Protobuf, Raft"
                      className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200 pr-8"
                    />
                    <Terminal className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-slate-400 flex items-center">
                  <Target className="w-3.5 h-3.5 mr-1 text-cyber-accent" />
                  Architecture & Design Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  value={proj.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  placeholder="e.g. Developed a distributed, consensus-backed Raft key-value storage engine using gRPC for inter-node replication and protobuf serialization."
                  className="w-full bg-slate-950/50 border border-cyber-border rounded px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyber-accent transition-all duration-200 font-mono resize-y"
                />
              </div>

              {/* Impact metrics */}
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-slate-400 flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1 text-cyber-accent" />
                  Measurable Metric / Project Impact
                </label>
                <input
                  type="text"
                  value={proj.impact}
                  onChange={(e) => handleProjectChange(index, 'impact', e.target.value)}
                  placeholder="e.g. Reduced read latencies by 58% and achieved 99.99% fault tolerance in split-brain simulations."
                  className="w-full bg-slate-950/50 border border-cyber-border rounded px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-cyber-accent transition-all duration-200"
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
