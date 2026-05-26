import React, { useState, useEffect } from 'react';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { FormPage } from './pages/FormPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultPage } from './pages/ResultPage';
import { Toast } from './components/ui/Toast';
import { useTerminalLogs } from './hooks/useTerminalLogs';
import { generateResumeJson, generateResumeLatex } from './lib/gemini';
import { escapeResumeData } from './utils/latexEscape';
import { AlertCircle } from 'lucide-react';
import { Button } from './components/ui/Button';

// High-quality initial profile data to let the user immediately test compilation out-of-the-box
const INITIAL_DEMO_PROFILE = {
  targetRole: {
    position: 'Senior Full-Stack Engineer',
    industry: 'Fintech / Enterprise SaaS',
    seniority: 'Senior'
  },
  personal: {
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '415-555-0199',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alex-rivera-dev',
    github: 'github.com/alexrivera-dev',
    portfolio: 'alexrivera.io',
    summary: 'High-impact Software Architect with 6+ years of experience engineering high-concurrency Node systems, robust microservices, and fluid React dashboards. Passionate about server-side query optimizations, performance pipelines, and modern DevOps.'
  },
  experience: [
    {
      company: 'Enterprise Nexus',
      role: 'Senior Software Architect',
      duration: 'Jan 2023 - Present',
      bullets: [
        'Spearheaded database query optimization models, reducing server load times by 48% and infrastructure costs by $14,000 monthly.',
        'Architected React 18 dashboard pipelines integrating gRPC endpoints, achieving a 32% increase in visual rendering efficiency.',
        'Managed and mentored a team of 7 developers, enforcing strict code hygiene standards and modular design principles.'
      ]
    },
    {
      company: 'CloudSync Inc.',
      role: 'Software Engineer II',
      duration: 'Aug 2020 - Dec 2022',
      bullets: [
        'Engineered real-time socket-based event synchronization libraries, resolving a multi-node transaction mismatch issue.',
        'Refactored legacy REST systems to GraphQL, accelerating API payload delivery metrics by 40% across iOS/Android targets.'
      ]
    }
  ],
  education: [
    {
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      gpa: '3.84 / 4.00',
      gradDate: 'May 2020'
    }
  ],
  skills: {
    languages: 'JavaScript, TypeScript, Go, Python, C++',
    frameworks: 'React, Node.js, Express, Next.js, FastAPI',
    tools: 'Docker, Git, AWS (EC2/S3), Kubernetes, GitHub Actions',
    databases: 'PostgreSQL, MongoDB, Redis'
  },
  projects: [
    {
      name: 'GridPulse Telemetry Engine',
      stack: 'Go, Redis, React, Protobuf',
      description: 'Designed an active telemetry packet broker capable of processing 120k packets/sec with microsecond delivery margins.',
      impact: 'Gained 3,000+ open-source stargazers and reduced average server CPU metrics by 18%.'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      year: '2023'
    }
  ]
};

export default function App() {
  // Read and write API key from local storage for convenient developer workflows
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('NEON_GEMINI_API_KEY') || '';
  });

  const [formData, setFormData] = useState(INITIAL_DEMO_PROFILE);
  const [page, setPage] = useState('form'); // 'form' | 'processing' | 'result' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  // Generation assets
  const [compiledJson, setCompiledJson] = useState(null);
  const [compiledLatex, setCompiledLatex] = useState('');

  // Terminal logging logic hook
  const { logs, progress, runGenerationPipeline } = useTerminalLogs();

  // Floating notifications hook
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info' // 'success' | 'warning' | 'error' | 'info'
  });

  const handleApiKeyChange = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('NEON_GEMINI_API_KEY', newKey);
    setToast({
      visible: true,
      message: 'API security credentials updated.',
      type: 'success'
    });
  };

  const lastCompileRef = React.useRef(0);

  const handleCompile = async () => {
    // Rate limit: prevent double-submits / rapid re-triggers (10s cooldown)
    const now = Date.now();
    if (now - lastCompileRef.current < 10_000) {
      setToast({ visible: true, message: 'Please wait before recompiling.', type: 'warning' });
      return;
    }

    // 1. Verify credentials exist
    const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!activeKey) {
      setErrorMsg('Gemini API key is missing. Please type a key in the header configuration bar or edit your project .env file.');
      setPage('error');
      return;
    }

    // 2. Basic input validation
    const name = formData?.personal?.name?.trim();
    const email = formData?.personal?.email?.trim();
    if (!name || name.length < 2) {
      setToast({ visible: true, message: 'Please enter your full name before compiling.', type: 'error' });
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToast({ visible: true, message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    if (!formData?.experience?.length) {
      setToast({ visible: true, message: 'Add at least one work experience entry before compiling.', type: 'error' });
      return;
    }

    lastCompileRef.current = now;
    setPage('processing');

    // 2. Prepare callbacks for the generation pipeline
    const apiCallback = {
      // First pass: create structured optimized JSON from raw forms
      generateJson: async () => {
        return await generateResumeJson(formData, activeKey);
      },
      // Second pass: convert that optimized JSON to compilable moderncv LaTeX
      generateLatex: async (optimizedJson) => {
        // Sanitize values for LaTeX compatibility
        const escapedJson = escapeResumeData(optimizedJson);
        return await generateResumeLatex(escapedJson, activeKey);
      }
    };

    // 3. Trigger compiler engine
    const result = await runGenerationPipeline(apiCallback);

    if (result.success) {
      setCompiledJson(result.resumeJson);
      setCompiledLatex(result.generatedLatex);
      setPage('result');
      setToast({
        visible: true,
        message: 'Compilation complete! LaTeX ModernCV code generated.',
        type: 'success'
      });
    } else {
      setErrorMsg(result.error || 'Failed to complete resume optimization due to network anomalies.');
      setPage('error');
    }
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-mono bg-cyber-bg text-cyber-text relative overflow-x-hidden">
      
      {/* Background Interactive Cyber Grid */}
      <div className="cyber-grid" />

      {/* Top Header Controls */}
      <AppHeader apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />

      {/* Core Pages Content Wrapper */}
      <main className="flex-grow py-10 px-6 max-w-6xl w-full mx-auto relative z-10">
        {page === 'form' && (
          <FormPage 
            data={formData} 
            onChange={setFormData} 
            onSubmit={handleCompile} 
            apiKey={apiKey}
            setToast={setToast}
          />
        )}

        {page === 'processing' && (
          <ProcessingPage 
            logs={logs} 
            progress={progress} 
          />
        )}

        {page === 'result' && (
          <ResultPage 
            resumeJson={compiledJson} 
            latex={compiledLatex} 
            onLatexChange={setCompiledLatex}
            onEdit={() => setPage('form')} 
            onRegenerate={handleCompile}
            setToast={setToast}
          />
        )}

        {page === 'error' && (
          <div className="max-w-xl mx-auto space-y-6 py-12 animate-fade-in font-mono">
            <div className="p-6 rounded border border-cyber-red/40 bg-cyber-red/5 shadow-[0_0_20px_rgba(255,62,62,0.15)] space-y-4">
              <div className="flex items-center space-x-2 text-cyber-red">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <h3 className="text-xs uppercase font-extrabold tracking-widest">
                  CRITICAL PROCESS EXCEPTION
                </h3>
              </div>
              <p className="text-[10px] leading-relaxed uppercase text-slate-300">
                The compilation pipeline terminated unexpectedly:
              </p>
              <div className="bg-[#040608] p-4 rounded border border-cyber-border text-slate-400 text-[10px] break-words select-text">
                {errorMsg}
              </div>
              <p className="text-[9px] uppercase leading-relaxed text-slate-500">
                Troubleshooting hints: Check if your API key is correctly typed, verify network ports are open, and review raw form values for weird characters.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setPage('form')}
                variant="primary"
                className="w-full text-center py-3"
              >
                Return to Form
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Info Status Bar */}
      <AppFooter />

      {/* Global popup toast notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={closeToast}
      />

    </div>
  );
}
