'use client';

import { useEffect, useState, useMemo } from 'react';
import { AlertCircleIcon, ClockIcon } from 'lucide-react';
import { SlidingNumber } from './ui/sliding-number';

interface CountdownTimerProps {
  lockedUntil: number;
}

export function CountdownTimer({ lockedUntil }: Readonly<CountdownTimerProps>) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = lockedUntil - now;
      return Math.max(0, Math.floor(difference / 1000));
    };

    const updateTimer = () => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        window.location.reload();
      }
    };

    // Initial calculation
    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [lockedUntil]);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
      <div className="flex items-center justify-center">
        <SlidingNumber value={minutes} padStart />
        <span className="mx-[2px]">:</span>
        <SlidingNumber value={seconds} padStart />
      </div>
    );
  };

  const isLastMinute = timeLeft <= 60;

  // Calculate color based on remaining time
  const timerColor = useMemo(() => {
    if (timeLeft > 60) return 'rgba(59, 130, 246, 0.8)'; // Initial blue color

    // Transition from blue to bright red
    const ratio = timeLeft / 60;
    const r = Math.round(255 * (1 - ratio) + 59 * ratio);
    const g = Math.round(0 * (1 - ratio) + 130 * ratio);
    const b = Math.round(0 * (1 - ratio) + 246 * ratio);

    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }, [timeLeft]);

  return (
    <div className="mt-8 flex flex-col items-center">
      <div
        className={`relative flex h-40 w-40 items-center justify-center ${isLastMinute ? 'animate-pulse' : ''}`}
      >
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-4 border-dark-200 opacity-30"></div>

        {/* Progress circle - animated with CSS */}
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="68"
            fill="transparent"
            stroke={timerColor}
            strokeWidth="8"
            strokeDasharray="427"
            strokeDashoffset={427 - ((timeLeft % 60) / 60) * 427}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Time display */}
        <div className="z-10 flex flex-col items-center justify-center">
          <span
            className={`font-mono text-4xl font-bold tracking-wider`}
            style={{ color: timerColor }}
          >
            {formatTime()}
          </span>
          <span className="mt-1 text-xs text-light-300">REMAINING TIME</span>
        </div>
      </div>

      <div
        className={`mt-6 flex items-center gap-2 ${isLastMinute ? 'text-red-400' : 'text-light-100'}`}
      >
        {isLastMinute ? (
          <ClockIcon
            className="size-5 animate-pulse"
            style={{ color: timerColor }}
          />
        ) : (
          <AlertCircleIcon className="size-5 text-blue-400" />
        )}
        <span style={{ color: isLastMinute ? timerColor : undefined }}>
          {isLastMinute
            ? 'Less than a minute left!'
            : 'You will be redirected automatically'}
        </span>
      </div>
    </div>
  );
}
