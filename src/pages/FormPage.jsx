import React, { useState, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { FormWizard } from '../components/forms/FormWizard';
import { Info, Upload, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { extractTextFromFile } from '../utils/fileParser';
import { parseRawResumeToSchema } from '../lib/gemini';

export function FormPage({ data, onChange, onSubmit, apiKey, setToast }) {
  const [isParsing, setIsParsing] = useState(false);
  const [parsedFileName, setParsedFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Verify key credentials exist
    const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!activeKey) {
      setToast({
        visible: true,
        message: 'API Key missing! Please set your Gemini key in the top-right configuration bar.',
        type: 'error'
      });
      return;
    }

    setIsParsing(true);
    setParsedFileName(file.name);
    
    setToast({
      visible: true,
      message: `Analyzing "${file.name}"... Initializing client parsers.`,
      type: 'info'
    });

    try {
      // 2. Extract text client-side
      const extractedText = await extractTextFromFile(file);
      
      setToast({
        visible: true,
        message: 'Text extracted. Auto-mapping profile schema via Gemini API...',
        type: 'info'
      });

      // 3. Ask Gemini to map this raw text into our schema format
      const parsedJson = await parseRawResumeToSchema(extractedText, activeKey);

      // 4. Update parent React form state
      onChange(parsedJson);

      setToast({
        visible: true,
        message: 'Profile parsed successfully! Form fields pre-populated.',
        type: 'success'
      });
    } catch (err) {
      console.error('File parsing error:', err);
      setToast({
        visible: true,
        message: err.message || 'Failed to parse file. Verify network connection and try again.',
        type: 'error'
      });
      setParsedFileName('');
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-mono">
      
      {/* Intro cyber prompt & File Uploader Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Info panel */}
        <div className="p-4 rounded border border-cyber-border bg-slate-950/40 backdrop-blur-sm relative overflow-hidden flex items-start space-x-3.5 shadow-lg select-none md:col-span-2">
          <div className="p-2 rounded bg-cyber-accent/10 border border-cyber-accent">
            <Info className="w-5 h-5 text-cyber-neon" />
          </div>
          <div>
            <h2 className="text-xs uppercase text-white font-extrabold tracking-wider">
              COMPILE YOUR ATS OPTIMIZED RESUME
            </h2>
            <p className="text-[10px] text-slate-500 uppercase leading-relaxed mt-1">
              Fill in the parameters below. When ready, click 'Compile with Gemini' to execute the double-pass AI pipeline. 
              The engine will automatically inject performance metrics and produce standard moderncv LaTeX.
            </p>
          </div>
        </div>

        {/* Dynamic File Uploader Widget */}
        <div className="glassmorphism p-4 rounded border border-cyber-border/80 flex flex-col justify-center items-center text-center shadow-lg relative min-h-[90px]">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.docx,.txt"
            className="hidden"
            disabled={isParsing}
          />
          
          {isParsing ? (
            <div className="space-y-1.5 flex flex-col items-center">
              <RefreshCw className="w-5 h-5 text-cyber-neon animate-spin" />
              <span className="text-[8px] text-cyber-neon uppercase tracking-wider font-extrabold animate-pulse">
                Parsing dataset...
              </span>
            </div>
          ) : parsedFileName ? (
            <div className="space-y-1.5 flex flex-col items-center">
              <CheckCircle2 className="w-5 h-5 text-cyber-neon" />
              <span className="text-[8px] text-slate-300 uppercase tracking-wider font-extrabold truncate max-w-[180px]">
                {parsedFileName}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[8px] text-cyber-accent hover:text-cyber-neon uppercase font-bold underline cursor-pointer"
              >
                Upload another file
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center space-y-1 bg-cyber-accent/5 border border-dashed border-cyber-border hover:border-cyber-accent rounded-md p-3 w-full transition-all duration-200 group"
            >
              <Upload className="w-4 h-4 text-cyber-accent group-hover:text-cyber-neon group-hover:scale-105 transition-transform" />
              <span className="text-[8px] text-slate-400 group-hover:text-white uppercase font-bold tracking-wider">
                Upload existing resume
              </span>
              <span className="text-[6px] text-slate-600 uppercase">
                PDF, DOCX, TXT
              </span>
            </button>
          )}
        </div>

      </div>

      {/* Main wizard wrapper card */}
      <Card title="RESUME_FORM_WIZARD: // CANDIDATE_PROFILE" glow={true}>
        <FormWizard data={data} onChange={onChange} onSubmit={onSubmit} />
      </Card>

    </div>
  );
}
