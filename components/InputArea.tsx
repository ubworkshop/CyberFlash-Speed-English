import React from 'react';
import { InputStatus } from '../types';

interface InputAreaProps {
  value: string;
  onChange: (val: string) => void;
  status: InputStatus;
}

export const InputArea: React.FC<InputAreaProps> = ({ value, onChange, status }) => {
  const getBorderColor = () => {
    switch (status) {
      case 'correct': return 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]';
      case 'error': return 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-shake';
      default: return 'border-slate-700 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'correct': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="w-full max-w-md relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-fuchsia-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="TYPE_HERE..."
        spellCheck={false}
        className={`
          relative w-full bg-slate-900/90 text-center text-3xl font-bold font-['Share_Tech_Mono'] 
          py-6 px-4 rounded-lg border-2 outline-none transition-all duration-300
          placeholder-slate-600 uppercase tracking-widest
          ${getBorderColor()} ${getTextColor()}
        `}
      />
      
      {/* Status Indicator Icon */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {status === 'correct' && (
          <span className="text-green-500 text-2xl animate-bounce">✓</span>
        )}
        {status === 'error' && (
          <span className="text-red-500 text-2xl">✕</span>
        )}
      </div>
    </div>
  );
};