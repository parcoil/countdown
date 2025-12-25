import { useEffect, useState } from "react";
import { useHead } from '@unhead/react';

const newYears = new Date("January 1, 2026 00:00:00").getTime();

function formatTimeLeft(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function NewYears() {
  useHead({
    title: 'New Years Countdown - Days Until 2026',
    meta: [
      { name: 'description', content: 'Live countdown to New Years 2026. See how many days, hours, minutes, and seconds until January 1st.' },
    ],
  });

  const [time, setTime] = useState(() => formatTimeLeft(newYears));

  useEffect(() => {
    const tick = () => setTime(formatTimeLeft(newYears));
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-yellow-900 to-orange-800 text-white flex flex-col items-center justify-center px-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-light tracking-widest mb-2 text-yellow-200 animate-pulse">
          COUNTDOWN TO
        </h2>
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-200 via-white to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
          NEW YEARS
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
        {[
          { value: time.days, label: "Days" },
          { value: time.hours, label: "Hours" },
          { value: time.minutes, label: "Minutes" },
          { value: time.seconds, label: "Seconds" },
        ].map((unit, i) => (
          <div
            key={unit.label}
            className="backdrop-blur-md bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-br from-white to-yellow-100 bg-clip-text text-transparent tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base font-semibold tracking-wider text-orange-200 uppercase flex justify-center text-center">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewYears;