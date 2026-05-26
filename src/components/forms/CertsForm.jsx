import React from 'react';
import { Plus, Trash2, Award, ShieldCheck, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export function CertsForm({ data, onChange }) {
  const certifications = data.certifications || [];

  const handleCertChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({ ...data, certifications: updated });
  };

  const addCert = () => {
    onChange({
      ...data,
      certifications: [
        ...certifications,
        {
          name: '',
          issuer: '',
          year: ''
        }
      ]
    });
  };

  const removeCert = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    onChange({ ...data, certifications: updated });
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
        <h4 className="text-xs uppercase text-cyber-neon tracking-widest flex items-center select-none">
          <Award className="w-4 h-4 mr-2" />
          Credentials & Professional Certifications
        </h4>
        <Button onClick={addCert} variant="primary" size="sm" icon={Plus}>
          Add Record
        </Button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-cyber-border/30 rounded-md bg-slate-950/20">
          <p className="text-xs text-slate-500 uppercase tracking-widest">No certifications cataloged.</p>
          <button
            type="button"
            onClick={addCert}
            className="mt-3 text-xs text-cyber-accent hover:text-cyber-neon font-bold underline cursor-pointer"
          >
            Click here to initialize first credential entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="p-5 rounded border border-cyber-border/50 bg-slate-950/30 relative space-y-4 hover:border-cyber-accent/30 transition-colors duration-200"
            >
              {/* Delete Cert Button */}
              <button
                type="button"
                onClick={() => removeCert(index)}
                className="absolute top-4 right-4 p-1.5 rounded border border-transparent hover:border-red-500/30 hover:bg-red-500/10 text-slate-500 hover:text-cyber-red transition-all duration-150"
                title="Remove Certification"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <span className="text-[10px] text-cyber-accent font-extrabold uppercase bg-cyber-accent/5 px-2 py-0.5 border border-cyber-accent/20 rounded">
                Credential Entry #{index + 1}
              </span>

              {/* Form entries */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[9px] uppercase text-slate-400">Certification Title *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cert.name}
                      onChange={(e) => handleCertChange(index, 'name', e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect - Associate"
                      className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200 pr-8"
                    />
                    <ShieldCheck className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Issuing Authority *</label>
                  <input
                    type="text"
                    required
                    value={cert.issuer}
                    onChange={(e) => handleCertChange(index, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full bg-slate-950/70 border border-cyber-border rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyber-accent transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-slate-400">Year Awarded *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cert.year}
                      onChange={(e) => handleCertChange(index, 'year', e.target.value)}
                      placeholder="e.g. 2023"
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
