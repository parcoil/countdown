import { useEffect, useRef, useState } from "react";
import { startSnow, stopSnow } from "./particles";

const christmas = new Date("December 25, 2025 23:59:59").getTime();

function formatTimeLeft(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(() => formatTimeLeft(christmas));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas)
      startSnow(canvas, { count: 220, repel: { radius: 100, strength: 0.9 } });
    return () => {
      stopSnow();
    };
  }, []);

  useEffect(() => {
    const tick = () => setTime(formatTimeLeft(christmas));
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative bg-linear-to-br from-red-950 via-red-900 to-green-800 text-white h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Glowing orbs background */}
      {/* <div className="absolute top-20 left-20 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-green-600 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      /> */}

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Title */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-widest mb-2 text-green-200 animate-pulse">
            COUNTDOWN TO
          </h2>
          <h1 className="text-6xl md:text-8xl font-bold bg-linear-to-r from-red-200 via-white to-green-200 bg-clip-text text-transparent drop-shadow-2xl">
            CHRISTMAS
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
              <div className="text-5xl md:text-7xl font-bold mb-2 bg-linear-to-br from-white to-red-100 bg-clip-text text-transparent tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="text-sm md:text-base font-semibold tracking-wider text-green-200 uppercase flex justify-center text-center">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="text-center mt-8"></div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  );
}

export default App;
