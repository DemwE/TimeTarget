'use client';

import { useEffect, useState } from "react";
import { updateThemeMode } from "@/lib/timer";
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [lightModeColors, setLightModeColors] = useState({ background: '#ebedfa', text: '#000000' });
  const [darkModeColors, setDarkModeColors] = useState({ background: '#111827', text: '#ffffff' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    const savedLightColors = localStorage.getItem('lightModeColors');
    const savedDarkColors = localStorage.getItem('darkModeColors');
    if (savedTheme) {
      setThemeMode(savedTheme as 'light' | 'dark');
    }
    if (savedLightColors) {
      setLightModeColors(JSON.parse(savedLightColors));
    }
    if (savedDarkColors) {
      setDarkModeColors(JSON.parse(savedDarkColors));
    }
  }, []);

  useEffect(() => {
    updateThemeMode(themeMode);
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('lightModeColors', JSON.stringify(lightModeColors));
  }, [lightModeColors]);

  useEffect(() => {
    localStorage.setItem('darkModeColors', JSON.stringify(darkModeColors));
  }, [darkModeColors]);

  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleColorChange = (mode: 'light' | 'dark', type: 'background' | 'text', color: string) => {
    if (mode === 'light') {
      setLightModeColors((prevColors) => ({ ...prevColors, [type]: color }));
    } else {
      setDarkModeColors((prevColors) => ({ ...prevColors, [type]: color }));
    }
  };

  const resetColors = (mode: 'light' | 'dark') => {
    if (mode === 'light') {
      setLightModeColors({ background: '#ebedfa', text: '#000000' });
    } else {
      setDarkModeColors({ background: '#111827', text: '#ffffff' });
    }
  };

  const currentColors = themeMode === 'light' ? lightModeColors : darkModeColors;

  return (
    <main style={{ backgroundColor: currentColors.background, color: currentColors.text }} className="min-h-dvh py-8 px-20">
      <h1 className="text-6xl">Settings - Alpha</h1>
      <div className="mt-2">
        <div className="space-y-2">
          <h2 className="text-4xl">Theme</h2>
          <div className="flex">
            <Switch checked={themeMode === 'dark'} onCheckedChange={toggleTheme} />
            <span className="ml-2">{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
          <h3 className="text-2xl">Personalize theme</h3>
          <div className="flex flex-col">
            <div>
              <h4 className="text-xl">Light Mode colors</h4>
              <div className="flex">
                <input className="bg-transparent" type="color" value={lightModeColors.background} onChange={(e) => handleColorChange('light', 'background', e.target.value)} />
                <span>Background</span>
              </div>
              <div className="flex">
                <input className="bg-transparent" type="color" value={lightModeColors.text} onChange={(e) => handleColorChange('light', 'text', e.target.value)} />
                <span>Text</span>
              </div>
              <button className="rounded-md bg-black p-1 hover:bg-gray-900 text-white transition-colors select-none" onClick={() => resetColors('light')}>
                Reset
              </button>
            </div>
            <div>
              <h4 className="text-xl">Dark Mode colors</h4>
              <div className="flex">
                <input className="bg-transparent" type="color" value={darkModeColors.background} onChange={(e) => handleColorChange('dark', 'background', e.target.value)} />
                <span>Background</span>
              </div>
              <div className="flex">
                <input className="bg-transparent" type="color" value={darkModeColors.text} onChange={(e) => handleColorChange('dark', 'text', e.target.value)} />
                <span>Text</span>
              </div>
              <button className="rounded-md bg-black p-1 hover:bg-gray-900 text-white transition-colors select-none" onClick={() => resetColors('dark')}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <a href="/" className="mt-4 text-xl underline">Back to Timer</a>
      <p className="mt-8">More Setting soon</p>
    </main>
  );
}