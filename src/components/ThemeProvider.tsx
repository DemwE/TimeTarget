'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { updateThemeMode } from '@/lib/timer';

interface ThemeContextProps {
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  currentColors: { background: string; text: string; };
  setCurrentColors: (colors: { background: string; text: string; }) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [currentColors, setCurrentColors] = useState({ background: '#ebedfa', text: '#000000' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    const savedColors = savedTheme === 'dark' ? localStorage.getItem('darkModeColors') : localStorage.getItem('lightModeColors');
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      setCurrentColors(parsedColors);
    } else if (savedTheme === 'dark') {
      setCurrentColors({ background: '#111827', text: '#ffffff' });
    }
    if (savedTheme) {
      setThemeMode(savedTheme as 'light' | 'dark');
    }
  }, []);

  useEffect(() => {
    updateThemeMode(themeMode);
    const savedColors = themeMode === 'dark' ? localStorage.getItem('darkModeColors') : localStorage.getItem('lightModeColors');
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      setCurrentColors(parsedColors);
    } else if (themeMode === 'dark') {
      setCurrentColors({ background: '#111827', text: '#ffffff' });
    } else {
      setCurrentColors({ background: '#ebedfa', text: '#000000' });
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, currentColors, setCurrentColors }}>
      <div style={{ backgroundColor: currentColors.background, color: currentColors.text }} className="min-h-dvh transition-colors">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};