import React from 'react';
import { WordData } from '../types';

interface CyberCardProps {
  data: WordData;
  isFlipped: boolean;
  onFlip: () => void;
}

export const CyberCard: React.FC<CyberCardProps> = ({ data, isFlipped, onFlip }) => {
  return (
    <div 
      className="relative w-full max-w-md h-96 perspective-1000 cursor-pointer group mb-8"
      onClick={onFlip}
    >
      <div 
        className={`
          relative w-full h-full transform-style-3d transition-transform duration-700 
          ease-[cubic-bezier(0.34,1.56,0.64,1)] 
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        
        {/* FRONT */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-slate-900 border-2 border-cyan-500/50 neon-box-cyan flex flex-col items-center justify-center p-6 select-none">
          <div className="absolute top-4 left-4 text-cyan-500/30 font-['Orbitron'] text-sm tracking-widest">FRONT // TERM_DATA</div>
          <div className="absolute top-4 right-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
          </div>
          
          <div className="text-8xl mb-6 filter drop-shadow-lg transform transition-transform group-hover:scale-110 duration-300">
            {data.emoji}
          </div>
          <h2 className="text-4xl font-bold font-['Orbitron'] text-white mb-2 tracking-wide neon-text-cyan text-center">
            {data.word}
          </h2>
          <p className="text-xl text-cyan-300 font-mono tracking-wider opacity-80">
            {data.phonetic}
          </p>
          
          <div className="absolute bottom-6 text-xs text-cyan-500/50 font-['Share_Tech_Mono']">
            CLICK_TO_FLIP_CARD
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-slate-900 border-2 border-fuchsia-500/50 neon-box-pink shadow-[0_0_40px_rgba(236,72,153,0.4)] flex flex-col items-center justify-center p-8 select-none"
        >
          <div className="absolute top-4 left-4 text-fuchsia-500/30 font-['Orbitron'] text-sm tracking-widest">BACK // CONTEXT</div>
          <div className="absolute top-4 right-4">
             <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse shadow-[0_0_10px_#e879f9]"></div>
          </div>

          <h3 
            className="text-3xl font-bold text-fuchsia-400 mb-6 text-center"
            style={{ textShadow: '0 0 10px rgba(236, 72, 153, 0.7)' }}
          >
            {data.chinese}
          </h3>
          
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-fuchsia-500 w-full">
            <p className="text-lg text-slate-200 italic font-medium leading-relaxed">
              "{data.sentence}"
            </p>
          </div>

          <div className="absolute bottom-6 text-xs text-fuchsia-500/50 font-['Share_Tech_Mono']">
            AUTO_AUDIO_SEQUENCE_INITIATED
          </div>
        </div>
      </div>
    </div>
  );
};