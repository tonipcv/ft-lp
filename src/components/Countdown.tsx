"use client";

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              // Reset to 24 hours when countdown reaches zero
              hours = 24;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 text-2xl font-light mb-8">
      <div className="text-center">
        <div className="bg-white/10 px-4 py-2 rounded-lg">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <div className="text-xs text-neutral-400 mt-1">Horas</div>
      </div>
      <div className="text-2xl">:</div>
      <div className="text-center">
        <div className="bg-white/10 px-4 py-2 rounded-lg">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-xs text-neutral-400 mt-1">Minutos</div>
      </div>
      <div className="text-2xl">:</div>
      <div className="text-center">
        <div className="bg-white/10 px-4 py-2 rounded-lg">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className="text-xs text-neutral-400 mt-1">Segundos</div>
      </div>
    </div>
  );
} 