import { useEffect, useState } from "react";
import { useHead } from "@unhead/react";

const hytaleRelease = new Date("January 13, 2026 7:00:00").getTime();

function formatTimeLeft(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function Hytale() {
  useHead({
    title: "Hytale Countdown - Days Until Release",
    meta: [
      {
        name: "description",
        content:
          "Live countdown to Hytale game release on January 13, 2026. See how many days left until the launch.",
      },
    ],
  });

  const [time, setTime] = useState(() => formatTimeLeft(hytaleRelease));

  useEffect(() => {
    const tick = () => setTime(formatTimeLeft(hytaleRelease));
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-green-800 text-white flex flex-col items-center justify-center px-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-light tracking-widest mb-2 text-blue-200 animate-pulse">
          COUNTDOWN TO
        </h2>
        {/* <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
          HYTALE
        </h1> */}
        <img
          src="https://hytale.com/static/images/logo.png"
          alt=""
          width={300}
          height={300}
        />
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
            <div className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base font-semibold tracking-wider text-purple-200 uppercase flex justify-center text-center">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      <a
        href="https://hytale.com"
        className=" text-blue-300 hover:text-blue-200 transition-colors"
      >
        Visit Hytale Website
      </a>
    </div>
  );
}

export default Hytale;
