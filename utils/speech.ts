import { AppSettings } from '../types';

let voices: SpeechSynthesisVoice[] = [];

// Initialize voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    voices = window.speechSynthesis.getVoices();
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export const speak = (text: string, settings: AppSettings) => {
  if (!('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = settings.rate;
  
  // Attempt to select the correct voice based on accent preference
  const preferredLang = settings.accent === 'US' ? 'en-US' : 'en-GB';
  
  // Prioritize Google voices as they sound more natural, fallback to generic lang match
  const selectedVoice = voices.find(v => v.lang === preferredLang && v.name.includes('Google')) 
                     || voices.find(v => v.lang === preferredLang)
                     || voices.find(v => v.lang.startsWith('en'));

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};