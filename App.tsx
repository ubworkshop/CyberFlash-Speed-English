import React, { useState, useEffect, useCallback } from 'react';
import { WORDS } from './data';
import { AppSettings, InputStatus } from './types';
import { speak, stopSpeech } from './utils/speech';
import { CyberCard } from './components/CyberCard';
import { InputArea } from './components/InputArea';
import { Controls } from './components/Controls';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputStatus, setInputStatus] = useState<InputStatus>('neutral');
  const [settings, setSettings] = useState<AppSettings>({ rate: 1.0, accent: 'US' });

  const currentWordData = WORDS[currentIndex];

  // Helper to handle speech based on flip state
  const speakCurrent = useCallback((flipped: boolean, forceWord: boolean = false) => {
    stopSpeech();
    if (flipped && !forceWord) {
      speak(currentWordData.sentence, settings);
    } else {
      speak(currentWordData.word, settings);
    }
  }, [currentWordData, settings]);

  // Initial load audio
  useEffect(() => {
    // Small delay to ensure browser readiness
    const timer = setTimeout(() => {
      speakCurrent(isFlipped);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex, speakCurrent]); // Don't add isFlipped here to avoid double speak on flip click manually

  const handleNext = () => {
    stopSpeech();
    setIsFlipped(false);
    setInputValue('');
    setInputStatus('neutral');
    setCurrentIndex((prev) => (prev + 1) % WORDS.length);
  };

  const handleFlip = () => {
    const newState = !isFlipped;
    setIsFlipped(newState);
    speakCurrent(newState);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    
    const target = currentWordData.word.toLowerCase();
    const input = val.toLowerCase();

    if (input === target) {
      setInputStatus('correct');
      // Reward Audio
      speak("Correct! " + currentWordData.word, settings);
      
      // Auto flip to show context reward
      if (!isFlipped) {
        setIsFlipped(true);
      }
    } else if (target.startsWith(input)) {
      setInputStatus('neutral');
    } else {
      setInputStatus('error');
      // Optional: Vibrate device if supported
      if (navigator.vibrate) navigator.vibrate(200);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black flex flex-col items-center justify-center p-4">
      
      {/* Header / Title */}
      <div className="absolute top-6 left-0 right-0 text-center opacity-80">
        <h1 className="text-2xl md:text-3xl font-['Orbitron'] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 neon-text-cyan">
          CYBER<span className="text-white">FLASH</span>
        </h1>
        <div className="text-[10px] text-slate-500 font-mono tracking-[0.5em] mt-1">SPEED TRAINING PROTOCOL</div>
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center z-10 pt-16">
        
        {/* Progress Indicator */}
        <div className="w-full max-w-md flex justify-between text-xs font-mono text-slate-500 mb-4 px-1">
          <span>UNIT: {currentWordData.id.toString().padStart(2, '0')}</span>
          <span>TOTAL: {WORDS.length.toString().padStart(2, '0')}</span>
        </div>

        {/* 3D Card */}
        <CyberCard 
          data={currentWordData} 
          isFlipped={isFlipped} 
          onFlip={handleFlip} 
        />

        {/* Input Field */}
        <InputArea 
          value={inputValue} 
          onChange={handleInputChange} 
          status={inputStatus} 
        />

        {/* Controls */}
        <Controls 
          settings={settings}
          onUpdateSettings={setSettings}
          onNext={handleNext}
          onReplay={() => speakCurrent(isFlipped)}
        />
        
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-1/4 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-10 w-80 h-80 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] [background-position:center] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)' }}></div>

    </div>
  );
};

export default App;