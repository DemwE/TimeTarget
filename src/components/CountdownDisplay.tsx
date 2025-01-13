import React from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownDisplayProps {
  timeRemaining: TimeRemaining;
  colors: { background: string; text: string;};
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ timeRemaining, colors }) => {
  return (
    <div id="countdownDisplay" className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-sora select-none" style={{ color: colors.text }}>
      <div className="min-w-24">
        <p className="text-6xl font-bold">{timeRemaining.days}</p>
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
  );
};

export default CountdownDisplay;