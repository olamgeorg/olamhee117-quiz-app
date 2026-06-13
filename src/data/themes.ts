import { BackgroundTheme } from '../types';

export const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 'cyber-dark',
    name: 'Cyber Indigo (Vibrant Accent)',
    bgClass: 'bg-slate-950 text-slate-100 selection:bg-fuchsia-500 selection:text-white',
    cardClass: 'bg-slate-900/90 border border-violet-500/30 shadow-fuchsia-500/10 hover:border-violet-400/50',
    accentClass: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400',
    buttonClass: 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 shadow-lg shadow-fuchsia-500/20 text-white',
    textColor: 'text-slate-100'
  },
  {
    id: 'neon-emerald',
    name: 'Electric Jade',
    bgClass: 'bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-black',
    cardClass: 'bg-zinc-900/95 border border-emerald-500/30 shadow-emerald-500/5 hover:border-emerald-400/50',
    accentClass: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',
    buttonClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20 text-white',
    textColor: 'text-zinc-100'
  },
  {
    id: 'sunset-burst',
    name: 'Sunset Magenta',
    bgClass: 'bg-neutral-950 text-white selection:bg-rose-500',
    cardClass: 'bg-neutral-900/95 border border-rose-500/30 shadow-rose-500/5 hover:border-rose-400/50',
    accentClass: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400',
    buttonClass: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-md shadow-rose-500/20 text-white',
    textColor: 'text-white font-sans'
  },
  {
    id: 'cosmic-royal',
    name: 'Royal Electric Blue',
    bgClass: 'bg-stone-950 text-slate-100 selection:bg-blue-500 selection:text-white',
    cardClass: 'bg-stone-900/95 border border-blue-500/30 shadow-blue-500/5 hover:border-blue-400/50',
    accentClass: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400',
    buttonClass: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 shadow-md shadow-blue-500/20 text-white',
    textColor: 'text-slate-100'
  },
  {
    id: 'warm-academic',
    name: 'Retro Academic Paper',
    bgClass: 'bg-amber-50 text-amber-950 selection:bg-amber-300 selection:text-amber-950',
    cardClass: 'bg-white border-2 border-amber-200 shadow-md hover:border-orange-300',
    accentClass: 'text-orange-850 bg-gradient-to-r from-orange-800 to-rose-700 bg-clip-text text-transparent',
    buttonClass: 'bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 shadow-md shadow-orange-500/10 text-white',
    textColor: 'text-amber-950'
  },
  {
    id: 'solarized-cyan',
    name: 'Solarized Teal',
    bgClass: 'bg-teal-950 text-teal-100 selection:bg-teal-400 selection:text-black',
    cardClass: 'bg-teal-900/80 border border-teal-500/30 shadow-teal-500/5 hover:border-teal-400/50',
    accentClass: 'text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-green-300 to-emerald-300',
    buttonClass: 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-md shadow-teal-500/20 text-white',
    textColor: 'text-teal-500'
  }
];
