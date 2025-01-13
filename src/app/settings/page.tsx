'use client';

import {useEffect, useState} from "react";
import {useTheme} from "@/components/ThemeProvider";
import Switch from "@/components/Switch";

export default function Settings() {
  const {themeMode, toggleTheme} = useTheme();
  const [lightModeColors, setLightModeColors] = useState({background: '#ebedfa', text: '#000000'});
  const [darkModeColors, setDarkModeColors] = useState({background: '#111827', text: '#ffffff'});
  const [notificationPermission, setNotificationPermission] = useState<string | null>(null);
  const [currentColors, setCurrentColors] = useState({background: '#ebedfa', text: '#000000'});

  useEffect(() => {
    const savedLightColors = localStorage.getItem('lightModeColors');
    const savedDarkColors = localStorage.getItem('darkModeColors');
    if (savedLightColors) {
      setLightModeColors(JSON.parse(savedLightColors));
    }
    if (savedDarkColors) {
      setDarkModeColors(JSON.parse(savedDarkColors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lightModeColors', JSON.stringify(lightModeColors));
  }, [lightModeColors]);

  useEffect(() => {
    localStorage.setItem('darkModeColors', JSON.stringify(darkModeColors));
  }, [darkModeColors]);

  useEffect(() => {
    setCurrentColors(themeMode === 'dark' ? darkModeColors : lightModeColors);
  }, [themeMode, lightModeColors, darkModeColors]);

  const handleColorChange = (mode: 'light' | 'dark', type: 'background' | 'text', color: string) => {
    if (mode === 'light') {
      setLightModeColors((prevColors) => ({...prevColors, [type]: color}));
    } else {
      setDarkModeColors((prevColors) => ({...prevColors, [type]: color}));
    }
  };

  const resetColors = (mode: 'light' | 'dark') => {
    if (mode === 'light') {
      const defaultLightColors = {background: '#ebedfa', text: '#000000'};
      setLightModeColors(defaultLightColors);
      if (themeMode === 'light') {
        setCurrentColors(defaultLightColors);
      }
    } else {
      const defaultDarkColors = {background: '#111827', text: '#ffffff'};
      setDarkModeColors(defaultDarkColors);
      if (themeMode === 'dark') {
        setCurrentColors(defaultDarkColors);
      }
    }
  };

  const resetNotificationPrivileges = () => {
    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission);
    });
  }

  return (
    <main className="min-h-dvh py-8 px-20" style={{ backgroundColor: currentColors.background, color: currentColors.text }}>
      <h1 className="text-6xl">Settings</h1>
      <div className="mt-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-4xl">Theme</h2>
          <div className="flex">
            <Switch checked={themeMode === 'dark'} onChange={toggleTheme}
                    label={themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}/>
          </div>
          <h3 className="text-2xl">Personalize theme</h3>
          <div className="flex flex-col space-y-2">
            <div className="space-y-1">
              <h4 className="text-xl">Light Mode colors</h4>
              <div className="flex space-x-1">
                <input className="bg-transparent" type="color" value={lightModeColors.background}
                       onChange={(e) => handleColorChange('light', 'background', e.target.value)}/>
                <span>Background</span>
              </div>
              <div className="flex space-x-1">
                <input className="bg-transparent" type="color" value={lightModeColors.text}
                       onChange={(e) => handleColorChange('light', 'text', e.target.value)}/>
                <span>Text</span>
              </div>
              <button className="rounded-full bg-black p-2 px-4 hover:bg-gray-900 dark:hover:bg-gray-950 text-white transition-colors select-none"
                      onClick={() => resetColors('light')}>
                Reset
              </button>
            </div>
            <div className="space-y-1">
              <h4 className="text-xl">Dark Mode colors</h4>
              <div className="flex space-x-1">
                <input className="bg-transparent" type="color" value={darkModeColors.background}
                       onChange={(e) => handleColorChange('dark', 'background', e.target.value)}/>
                <span>Background</span>
              </div>
              <div className="flex space-x-1">
                <input className="bg-transparent" type="color" value={darkModeColors.text}
                       onChange={(e) => handleColorChange('dark', 'text', e.target.value)}/>
                <span>Text</span>
              </div>
              <button className="rounded-full bg-black p-2 px-4 hover:bg-gray-900 dark:hover:bg-gray-950 text-white transition-colors select-none"
                      onClick={() => resetColors('dark')}>
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-4 inline-grid">
          <h2 className="text-4xl">Notifications</h2>
          <button onClick={resetNotificationPrivileges}
                  className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 text-white transition-colors select-none">Reset
            privileges
          </button>
        </div>
      </div>
      <div className="mt-8 space-y-5">
        <a href="/" className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 text-white transition-colors select-none">Back to Timer</a>
        <p>More Setting soon</p>
      </div>
    </main>
  );
}