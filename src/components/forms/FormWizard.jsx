import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, FolderOpen, Sliders, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { PersonalForm } from './PersonalForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';
import { CertsForm } from './CertsForm';
import { Button } from '../ui/Button';

export function FormWizard({ data, onChange, onSubmit }) {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Identity / Goal', icon: User },
    { label: 'Experience', icon: Briefcase },
    { label: 'Education', icon: GraduationCap },
    { label: 'Projects', icon: FolderOpen },
    { label: 'Skills & Certs', icon: Sliders }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Quick field validations for form submission
  const validateForm = () => {
    const name = data.personal?.name?.trim();
    const email = data.personal?.email?.trim();
    
    if (!name || !email) {
      return {
        isValid: false,
        error: 'Candidate Name and Email Address are strictly required to compile a moderncv document.'
      };
    }
    
    return { isValid: true };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (!validation.isValid) {
      alert(validation.error);
      setStep(0); // Bounce back to first step to fix
      return;
    }
    onSubmit();
  };

  const renderActiveStep = () => {
    switch (step) {
      case 0:
        return <PersonalForm data={data} onChange={onChange} />;
      case 1:
        return <ExperienceForm data={data} onChange={onChange} />;
      case 2:
        return <EducationForm data={data} onChange={onChange} />;
      case 3:
        return <ProjectsForm data={data} onChange={onChange} />;
      case 4:
        return (
          <div className="space-y-10">
            <SkillsForm data={data} onChange={onChange} />
            <CertsForm data={data} onChange={onChange} />
          </div>
        );
      default:
        return null;
    }
  };

  const IconComponent = steps[step].icon;

  return (
    <div className="space-y-8">
      
      {/* Dynamic wizard node path indicator */}
      <div className="grid grid-cols-5 gap-2 border-b border-cyber-border/20 pb-5 select-none">
        {steps.map((s, idx) => {
          const StepIcon = s.icon;
          const isActive = idx === step;
          const isPassed = idx < step;
          
          return (
            <div 
              key={idx}
              onClick={() => setStep(idx)}
              className="flex flex-col items-center space-y-1.5 cursor-pointer group text-center"
            >
              <div className={`p-2.5 rounded-full border transition-all duration-200 ${
                isActive 
                  ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-neon shadow-[0_0_12px_rgba(0,212,170,0.25)]' 
                  : isPassed
                    ? 'bg-slate-950/60 border-cyber-border text-cyber-accent'
                    : 'bg-slate-950/30 border-slate-800 text-slate-600 group-hover:border-slate-700/60 group-hover:text-slate-400'
              }`}>
                <StepIcon className="w-4 h-4" />
              </div>
              <span className={`text-[8px] uppercase tracking-wider hidden sm:inline-block font-extrabold ${
                isActive ? 'text-cyber-neon font-black' : isPassed ? 'text-cyber-accent' : 'text-slate-600'
              }`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Profile completion metric */}
      <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 font-mono">
        <span>Form Pipeline Nodes: Verified</span>
        <span>Node {step + 1} of 5</span>
      </div>

      {/* Main Form Area */}
      <form onSubmit={handleSubmit} className="min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderActiveStep()}
          </motion.div>
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="flex justify-between items-center border-t border-cyber-border/40 pt-6 mt-8">
          <Button
            onClick={handleBack}
            disabled={step === 0}
            variant="secondary"
            icon={ArrowLeft}
          >
            Back
          </Button>

          {step < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              variant="primary"
              className="px-6"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              className="bg-gradient-to-r from-cyber-accent to-cyber-neon text-cyber-bg hover:brightness-110 shadow-[0_0_15px_rgba(0,255,200,0.3)] animate-pulse-glow"
              icon={ShieldCheck}
            >
              Compile with Gemini
            </Button>
          )}
        </div>
      </form>

    </div>
  );
}
