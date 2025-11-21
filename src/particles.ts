let rafId: number | null = null;
let isRunning = false;
let resizeListener: (() => void) | null = null;
let pointerMoveListener: ((e: PointerEvent) => void) | null = null;
let pointerLeaveListener: ((e: PointerEvent) => void) | null = null;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  sway: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function startSnow(
  canvas: HTMLCanvasElement,
  options?: {
    count?: number;
    color?: string;
    repel?: { radius?: number; strength?: number };
  }
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;
  const DPR = window.devicePixelRatio || 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function setSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  setSize();

  const particleCount = options?.count ?? 200;
  const color = options?.color ?? "#ffffff";
  const repelRadius = options?.repel?.radius ?? 100;
  const repelStrength = options?.repel?.strength ?? 0.9;
  let mouseX: number | null = null;
  let mouseY: number | null = null;
  let mouseActive = false;
  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: rand(0, width),
      y: rand(0, height),
      vx: rand(-0.25, 0.25),
      vy: rand(0.45, 1.1),
      r: rand(0.8, 3.5),
      alpha: rand(0.4, 1),
      sway: rand(0, Math.PI * 2),
    });
  }

  function updateAndDraw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.sway += 0.003 + p.r * 0.0005;
      p.x += p.vx + Math.sin(p.sway) * 0.12 * (p.r / 2);
      p.y += p.vy;

      if (mouseActive && mouseX != null && mouseY != null) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < repelRadius) {
          const force = (1 - dist / repelRadius) * repelStrength;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx *= 0.995;
      p.vy = p.vy * 0.992 + 0.018;

      const maxVx = 1.2;
      if (p.vx > maxVx) p.vx = maxVx;
      if (p.vx < -maxVx) p.vx = -maxVx;

      if (p.y - p.r > height) {
        p.y = -p.r;
        p.x = rand(0, width);
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      const rgba =
        color && color.startsWith("#") && color.length === 7
          ? `${parseInt(color.slice(1, 3), 16)},${parseInt(
              color.slice(3, 5),
              16
            )},${parseInt(color.slice(5, 7), 16)}`
          : "255,255,255";
      ctx.fillStyle = `rgba(${rgba},${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    rafId = requestAnimationFrame(updateAndDraw);
  }

  if (!isRunning) {
    isRunning = true;
    rafId = requestAnimationFrame(updateAndDraw);
  }

  pointerMoveListener = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseActive = true;
  };
  pointerLeaveListener = () => {
    mouseActive = false;
    mouseX = null;
    mouseY = null;
  };
  canvas.addEventListener("pointermove", pointerMoveListener);
  canvas.addEventListener("pointerleave", pointerLeaveListener);

  resizeListener = () => setSize();
  window.addEventListener("resize", resizeListener);
}

export function stopSnow() {
  if (rafId != null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (resizeListener) {
    window.removeEventListener("resize", resizeListener);
    resizeListener = null;
  }
  if (pointerMoveListener) {
    const canvases = document.getElementsByTagName("canvas");
    for (const c of Array.from(canvases)) {
      c.removeEventListener(
        "pointermove",
        pointerMoveListener as EventListener
      );
    }
    pointerMoveListener = null;
  }
  if (pointerLeaveListener) {
    const canvases = document.getElementsByTagName("canvas");
    for (const c of Array.from(canvases)) {
      c.removeEventListener(
        "pointerleave",
        pointerLeaveListener as EventListener
      );
    }
    pointerLeaveListener = null;
  }
  isRunning = false;
}

export default { startSnow, stopSnow };
