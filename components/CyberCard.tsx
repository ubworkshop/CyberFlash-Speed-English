import React from 'react';
import { WordData } from '../types';

interface CyberCardProps {
  data: WordData;
  isFlipped: boolean;
  onFlip: () => void;
  isSuccess?: boolean;
}

export const CyberCard: React.FC<CyberCardProps> = ({ data, isFlipped, onFlip, isSuccess }) => {
  return (
    <div 
      className="relative w-full max-w-md h-96 perspective-1000 cursor-pointer group mb-8"
      onClick={onFlip}
    >
      {/* Scale Wrapper for 'Pop' effect without conflicting with rotation transform */}
      <div className={`w-full h-full transition-transform duration-300 ease-out ${isSuccess && isFlipped ? 'scale-105' : ''}`}>
        
        {/* Rotation Container */}
        <div 
          className={`
            relative w-full h-full transform-style-3d transition-transform duration-500 
            ease-[cubic-bezier(0.175,0.885,0.32,1.275)] 
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
            className={`
              absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-slate-900 border-2 
              flex flex-col items-center justify-center p-8 select-none transition-all duration-300
              ${isSuccess 
                ? 'border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.5)]' 
                : 'border-fuchsia-500/50 shadow-[0_0_40px_rgba(236,72,153,0.4)] neon-box-pink'}
            `}
          >
            <div className={`absolute top-4 left-4 font-['Orbitron'] text-sm tracking-widest ${isSuccess ? 'text-green-500/50' : 'text-fuchsia-500/30'}`}>
              BACK // CONTEXT
            </div>
            <div className="absolute top-4 right-4">
               <div className={`w-2 h-2 rounded-full animate-pulse ${isSuccess ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-fuchsia-400 shadow-[0_0_10px_#e879f9]'}`}></div>
            </div>

            <h3 
              className={`text-3xl font-bold mb-6 text-center transition-colors ${isSuccess ? 'text-green-400' : 'text-fuchsia-400'}`}
              style={{ textShadow: isSuccess ? '0 0 10px rgba(34, 197, 94, 0.7)' : '0 0 10px rgba(236, 72, 153, 0.7)' }}
            >
              {data.chinese}
            </h3>
            
            <div className={`bg-slate-800/50 p-4 rounded-lg border-l-4 w-full transition-colors ${isSuccess ? 'border-green-500' : 'border-fuchsia-500'}`}>
              <p className="text-lg text-slate-200 italic font-medium leading-relaxed">
                "{data.sentence}"
              </p>
            </div>

            <div className={`absolute bottom-6 text-xs font-['Share_Tech_Mono'] ${isSuccess ? 'text-green-500/50' : 'text-fuchsia-500/50'}`}>
              {isSuccess ? 'VERIFICATION_COMPLETE' : 'AUTO_AUDIO_SEQUENCE_INITIATED'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};