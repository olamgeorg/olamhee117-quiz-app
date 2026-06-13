import React from 'react';
import { BackgroundTheme } from '../types';
import { BACKGROUND_THEMES } from '../data/themes';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: BackgroundTheme;
  onThemeChange: (theme: BackgroundTheme) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div id="theme-selector-panel" className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase opacity-90">
        <Palette className="w-4 h-4 text-fuchsia-400" />
        <span>Custom Study Ambiance</span>
      </div>
      
      <p className="text-xs opacity-75">
        Personalize your workspace background and accent themes to enhance study focus.
      </p>

      <div className="grid grid-cols-2 gap-2 mt-1 sm:grid-cols-3">
        {BACKGROUND_THEMES.map((theme) => {
          const isSelected = theme.id === currentTheme.id;
          return (
            <button
              key={theme.id}
              id={`theme-btn-${theme.id}`}
              onClick={() => onThemeChange(theme)}
              className={`relative flex items-center justify-between p-3 rounded-xl transition-all duration-300 border text-left cursor-pointer ${
                isSelected
                  ? 'border-fuchsia-400 bg-white/10 scale-[1.02] shadow-md shadow-fuchsia-500/10'
                  : 'border-white/5 bg-black/20 hover:bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-xs font-medium truncate">{theme.name}</span>
                {/* Visual palette preview */}
                <div className="flex gap-1">
                  <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                  <span className="w-3 h-3 rounded-full bg-fuchsia-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
              </div>
              {isSelected && (
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0 ml-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
