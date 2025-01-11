'use client';

import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '@/lib/counter';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import calendarIcon from "@/app/calendar.svg";
import githubIcon from "@/app/github.svg";

export default function Home() {
  const [targetDate, setTargetDate] = useState<string>('');

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

  useEffect(() => {
    if (!targetDate) return;

    localStorage.setItem('targetDate', targetDate);

    const updateTimer = () => {
      const currentDate = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const timeDiff = target - currentDate;

      if (timeDiff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeRemaining(calculateTimeRemaining(timeDiff));
      }
    };

    updateTimer();

    const countdownInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(countdownInterval);
  }, [targetDate]);

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ebedfa]">
      <div className="fixed bottom-5 left-5 flex flex-col space-y-2">
        <a className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none" target="_blank" href="https://github.com/DemwE/TimeTarget">
          <Image src={githubIcon} alt="github"/>
        </a>
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