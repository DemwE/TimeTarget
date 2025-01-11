'use client';

import React, {useState, useEffect} from 'react';
import {calculateTimeRemaining} from '@/lib/counter';
import Image from "next/image";
import {Popover, PopoverContent, PopoverTrigger} from '@radix-ui/react-popover';
import calendarIcon from "@/app/calendar.svg";
import githubIcon from "@/app/github.svg";
import notificationOnIcon from "@/app/notifications_active.svg";
import notificationOffIcon from "@/app/notifications_off.svg";

export default function Home() {
  const [targetDate, setTargetDate] = useState<string>('');
  const [notificationPermission, setNotificationPermission] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState<boolean>(false);

  useEffect(() => {
    const savedDate = localStorage.getItem('targetDate');
    if (savedDate) {
      setTargetDate(savedDate);
    }
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

    localStorage.setItem('targetDate', targetDate);

    const updateTimer = () => {
      const currentDate = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const timeDiff = target - currentDate;

      if (timeDiff <= 0) {
        if (!notificationSent && notificationPermission === 'granted') {
          sendNotification();
        }
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        setTimeRemaining(calculateTimeRemaining(timeDiff));
      }
    };

    updateTimer();

    const countdownInterval = setInterval(updateTimer, 1000);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ebedfa]">
      <div className="fixed bottom-5 left-5 flex flex-col space-y-2">
        <a className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none" target="_blank"
           href="https://github.com/DemwE/TimeTarget">
          <Image src={githubIcon} alt="github"/>
        </a>
        <button
          className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none"
          onClick={handleNotificationToggle}
        >
          <Image
            src={notificationPermission === 'granted' ? notificationOnIcon : notificationOffIcon}
            alt="notification"
          />
        </button>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none">
                <Image src={calendarIcon} alt="calendar"/>
              </button>
            </PopoverTrigger>
            <PopoverContent side="right" className="ml-2">
              <input
                type="datetime-local"
                value={targetDate}
                onChange={handleDateTimeChange}
                className="p-2 border border-black rounded"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div id="countdownDisplay" className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-sora select-none">
        <div className="min-w-24">
          <p className="text-6xl font-bold ">{timeRemaining.days}</p>
          <p>Days</p>
        </div>
        <div className="min-w-24">
          <p className="text-6xl font-bold">{timeRemaining.hours}</p>
          <p>Hours</p>
        </div>
        <div className="min-w-24">
          <p className="text-6xl font-bold">{timeRemaining.minutes}</p>
          <p>Minutes</p>
        </div>
        <div className="min-w-24">
          <p className="text-6xl font-bold">{timeRemaining.seconds}</p>
          <p>Seconds</p>
        </div>
      </div>
    </div>
  );
}