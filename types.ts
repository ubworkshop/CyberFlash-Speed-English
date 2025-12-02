export interface WordData {
  id: number;
  word: string;
  phonetic: string;
  chinese: string;
  sentence: string;
  emoji: string;
}

export interface AppSettings {
  rate: number; // Speech rate 0.5 - 2.0
  accent: 'US' | 'UK';
}

export type InputStatus = 'neutral' | 'correct' | 'error';
