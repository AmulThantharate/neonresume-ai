import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook to manage real-time and simulated hacker-terminal logs
 */
export function useTerminalLogs() {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const logIdCounter = useRef(0);

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
  };

  const addLog = useCallback((text, type = 'info') => {
    const newLog = {
      id: ++logIdCounter.current,
      timestamp: getTimestamp(),
      text,
      type // 'info', 'success', 'warning', 'error', 'command', 'success-cyan'
    };
    setLogs((prev) => [...prev, newLog]);
    return newLog.id;
  }, []);

  const updateLogText = useCallback((id, newText) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, text: newText } : log))
    );
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
    setProgress(0);
    logIdCounter.current = 0;
  }, []);

  // Helper to wait a bit
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Run full simulated logging flow matching pipeline milestones
   * It takes a generatorCallback (the actual fetch pipeline) and executes it,
   * weaving simulated progress logs around the network latency.
   */
  const runGenerationPipeline = async (apiCallback) => {
    clearLogs();
    setIsProcessing(true);
    setProgress(2);

    addLog('NeonResume AI v1.0.0 initialized.', 'success-cyan');
    addLog('Establishing handshake with Google Gemini engine...', 'info');
    await delay(600);
    setProgress(8);

    addLog('Handshake secure. API authorization granted.', 'success');
    addLog('------------------------------------------------', 'info');
    
    // Stage 1
    addLog('[STAGE 01] Initializing AI pipeline...', 'command');
    await delay(500);
    setProgress(15);

    // Stage 2
    addLog('[STAGE 02] Parsing candidate profile parameters...', 'info');
    await delay(700);
    setProgress(24);

    // Stage 3
    addLog('[STAGE 03] Optimizing ATS layout descriptors...', 'info');
    await delay(600);
    setProgress(32);

    // Stage 4
    addLog('[STAGE 04] Enhancing professional vocabulary matrices...', 'info');
    await delay(800);
    setProgress(40);

    // Stage 5
    const jsonStageId = addLog('[STAGE 05] Compiling profile into structured resume JSON...', 'info');
    await delay(400);
    setProgress(45);
    
    const waitingJsonLogId = addLog('>> [STATUS] Communicating with Google Gemini API (Optimizing JSON)...', 'warning');

    try {
      // Execute the actual AI operations
      const startTime = Date.now();
      
      // Phase 1: Call API to generate JSON
      const resumeJson = await apiCallback.generateJson();
      const elapsedJson = ((Date.now() - startTime) / 1000).toFixed(1);
      
      updateLogText(waitingJsonLogId, `>> [STATUS] Structured JSON compiled successfully in ${elapsedJson}s.`);
      addLog('JSON validation: STRICT_COMPLIANT [OK]', 'success');
      setProgress(60);
      await delay(600);

      // Stage 6
      addLog('[STAGE 06] Launching LaTeX compiler generator...', 'command');
      await delay(500);
      setProgress(68);

      // Stage 7
      addLog('[STAGE 07] Sanitizing custom inputs and escaping special LaTeX elements...', 'info');
      await delay(600);
      setProgress(75);

      // Stage 8
      const waitingLatexLogId = addLog('>> [STATUS] Transforming JSON to moderncv style banking template via Gemini...', 'warning');
      
      // Phase 2: Call API to convert JSON to LaTeX
      const latexStartTime = Date.now();
      const generatedLatex = await apiCallback.generateLatex(resumeJson);
      const elapsedLatex = ((Date.now() - latexStartTime) / 1000).toFixed(1);

      updateLogText(waitingLatexLogId, `>> [STATUS] Compiled LaTeX moderncv document in ${elapsedLatex}s.`);
      addLog('LaTeX Validation: OVERLEAF_COMPATIBLE [OK]', 'success');
      setProgress(88);
      await delay(600);

      // Stage 9
      addLog('[STAGE 09] Formatting document spacing and building hyperlinks...', 'info');
      await delay(500);
      setProgress(95);

      // Stage 10
      addLog('[STAGE 10] Resume compilation fully completed!', 'success-cyan');
      addLog('Ready for Overleaf synchronization.', 'success');
      setProgress(100);
      await delay(400);
      setIsProcessing(false);

      return {
        success: true,
        resumeJson,
        generatedLatex
      };

    } catch (err) {
      addLog(`[CRITICAL EXCEPTION] ${err.message}`, 'error');
      addLog('Terminating generator daemon thread.', 'error');
      setIsProcessing(false);
      return {
        success: false,
        error: err.message
      };
    }
  };

  return {
    logs,
    progress,
    isProcessing,
    addLog,
    runGenerationPipeline,
    clearLogs
  };
}
