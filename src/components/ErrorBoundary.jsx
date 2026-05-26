import { Component } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-bg font-mono px-6">
          <div className="max-w-lg w-full p-6 rounded border border-cyber-red/40 bg-cyber-red/5 shadow-[0_0_20px_rgba(255,62,62,0.15)] space-y-4">
            <div className="flex items-center space-x-2 text-cyber-red">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <h3 className="text-xs uppercase font-extrabold tracking-widest">
                RENDER EXCEPTION
              </h3>
            </div>
            <div className="bg-[#040608] p-4 rounded border border-cyber-border text-slate-400 text-[10px] break-words select-text">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="flex items-center space-x-2 text-[10px] uppercase font-bold text-cyber-neon border border-cyber-accent px-4 py-2 rounded hover:bg-cyber-accent/10 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
