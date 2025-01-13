'use client';

import React, { useState, useEffect } from 'react';
import { initializeTargetDate, startCountdown } from '@/lib/timer';
import CountdownDisplay from '@/components/CountdownDisplay';
import ControlPanel from '@/components/ControlPanel';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { themeMode, toggleTheme, currentColors } = useTheme();
  const [targetDate, setTargetDate] = useState<string>('');
  const [notificationPermission, setNotificationPermission] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState<boolean>(false);

  useEffect(() => {
    initializeTargetDate(setTargetDate, () => {});
  }, []);

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sendNotification = () => {
    if (!notificationSent && notificationPermission === 'granted') {
      new Notification('Time\'s up!', {
        body: 'Your countdown has ended.',
        icon: '/alarm.svg',
      });
      setNotificationSent(true);
    }
  };

  useEffect(() => {
    if (!targetDate) return;

    const countdownInterval = startCountdown(targetDate, notificationSent, notificationPermission, setTimeRemaining, sendNotification);

    return () => clearInterval(countdownInterval);
  }, [targetDate, notificationSent, notificationPermission]);

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTargetDate = event.target.value;
    if (newTargetDate !== targetDate) {
      setTargetDate(newTargetDate);
      setNotificationSent(false);
    }
  };

  const handleNotificationToggle = () => {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications.');
      return;
    }

    if (notificationPermission === 'granted') {
      setNotificationPermission('default');
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setNotificationPermission(permission);
        } else {
          setNotificationPermission('default');
        }
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen transition-colors">
      <ControlPanel
        targetDate={targetDate}
        themeMode={themeMode}
        notificationPermission={notificationPermission}
        handleDateTimeChange={handleDateTimeChange}
        toggleTheme={toggleTheme}
        handleNotificationToggle={handleNotificationToggle}
      />
      <CountdownDisplay timeRemaining={timeRemaining} colors={currentColors} />
    </main>
  );
}