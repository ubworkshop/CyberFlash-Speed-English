import React from 'react';
import { Play, SkipForward, Globe, Gauge } from 'lucide-react';
import { AppSettings } from '../types';

interface ControlsProps {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  onNext: () => void;
  onReplay: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ settings, onUpdateSettings, onNext, onReplay }) => {
  return (
    <div className="w-full max-w-md mt-10 p-6 rounded-xl bg-slate-900/80 border border-slate-700 backdrop-blur-sm">
      
      {/* Settings Row */}
      <div className="flex items-center justify-between mb-6 gap-4">
        {/* Accent Toggle */}
        <button 
          onClick={() => onUpdateSettings({ ...settings, accent: settings.accent === 'US' ? 'UK' : 'US' })}
          className="flex items-center space-x-2 px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors"
        >
          <Globe size={18} className="text-cyan-400" />
          <span className="text-xs font-mono font-bold text-cyan-400">{settings.accent} MODE</span>
        </button>

        {/* Speed Slider */}
        <div className="flex items-center space-x-3 flex-1">
          <Gauge size={18} className="text-fuchsia-400" />
          <input 
            type="range" 
            min="0.5" 
            max="1.5" 
            step="0.1" 
            value={settings.rate}
            onChange={(e) => onUpdateSettings({ ...settings, rate: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
          />
          <span className="text-xs font-mono text-fuchsia-400 w-8">{settings.rate}x</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={onReplay}
          className="flex-1 flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-all group"
        >
          <Play size={20} className="text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform" />
          <span className="font-['Orbitron'] tracking-wider">REPLAY</span>
        </button>

        <button 
          onClick={onNext}
          className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white py-3 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
        >
          <span className="font-['Orbitron'] tracking-wider font-bold">NEXT WORD</span>
          <SkipForward size={20} className="fill-white/20" />
        </button>
      </div>

    </div>
  );
};