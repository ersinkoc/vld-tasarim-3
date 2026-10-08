"use client";

import { useEffect, useRef } from "react";

type Kind = "token" | "reject" | "pass";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  kind: Kind;
  spin: number;
}

/**
 * "The Gate" — a canvas of raw input particles streaming toward a
 * schema gate. Valid data passes through and turns accent-coloured;
 * invalid data is rejected at the boundary and scatters.
 *
 * Purely decorative, DPR-aware, pauses when off-screen or when the
 * user prefers reduced motion.
 */
export function ValidationGate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const particles: Particle[] = [];

    const css = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    let accent = css("--accent");
    let danger = css("--danger");
    let fg = css("--fg");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const spawn = (seedX?: number): Particle => {
      // ~28% of the stream is invalid input
      const invalid = Math.random() < 0.28;
      return {
        x: seedX ?? -12,
        y: h * (0.12 + Math.random() * 0.76),
        vx: 0.9 + Math.random() * 1.5,
        vy: (Math.random() - 0.5) * 0.22,
        size: 1.6 + Math.random() * 3.2,
        life: 0,
        maxLife: 260 + Math.random() * 200,
        kind: invalid ? "reject" : "token",
        spin: (Math.random() - 0.5) * 0.06,
      };
    };

    // Gate position: 62% across the canvas
    const gateX = () => w * 0.62;

    /** Pre-fill the stream so the field looks alive on first paint. */
    const seed = () => {
      particles.length = 0;
      const target = Math.min(150, Math.round((w * h) / 13000));
      for (let i = 0; i < target; i++) {
        const p = spawn(Math.random() * w);
        const gx = gateX();
        // Pre-resolve gate crossings so colours are already correct.
        if (p.x >= gx) p.kind = Math.random() < 0.62 ? "pass" : "reject";
        if (p.kind === "pass") p.vx *= 1.55;
        particles.push(p);
      }
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      const gx = gateX();

      // density scales with area, capped for perf
      const target = Math.min(150, Math.round((w * h) / 13000));
      while (particles.length < target) particles.push(spawn());

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // The gate: reject invalid tokens with a burst
        if (p.kind === "reject" && p.x >= gx) {
          // scatter backward
          p.vx = -0.9 - Math.random() * 1.5;
          p.vy = (Math.random() - 0.5) * 3.2;
          p.kind = "reject";
          p.life = 0;
          continue;
        }
        // Valid tokens get "accepted" — colour shifts, speed increases
        if (p.kind === "token" && p.x >= gx) {
          p.kind = "pass";
          p.vx *= 1.55;
        }

        // Fade out
        const alpha =
          p.life < 14
            ? p.life / 14
            : p.life > p.maxLife - 40
              ? (p.maxLife - p.life) / 40
              : 1;

        if (p.life > p.maxLife || p.x > w + 30 || p.y < -30 || p.y > h + 30) {
          particles[i] = spawn();
          continue;
        }

        ctx.globalAlpha = Math.max(0, alpha) * 0.9;
        ctx.fillStyle =
          p.kind === "pass" ? accent : p.kind === "reject" ? danger : fg;

        // tokens are elongated rectangles — reads like data frames
        const stretch = p.kind === "pass" ? 3.2 : p.kind === "reject" ? 1.6 : 2.4;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin * p.life);
        ctx.fillRect(
          -p.size,
          -p.size * 0.28,
          p.size * stretch,
          p.size * 0.56,
        );
        ctx.restore();
      }

      // The gate line itself — a vertical rule with a soft bloom
      const gxInt = gx;
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.18, accent);
      grad.addColorStop(0.82, accent);
      grad.addColorStop(1, "transparent");

      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 18;
      ctx.fillStyle = grad;
      ctx.fillRect(gxInt - 0.6, h * 0.08, 1.4, h * 0.84);
      ctx.restore();

      // Faint tick marks along the gate so it reads as a checkpoint
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = accent;
      for (let y = h * 0.12; y < h * 0.88; y += 26) {
        ctx.fillRect(gxInt - 5, y, 10, 1);
      }
      ctx.restore();

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    };

    const onThemeChange = () => {
      accent = css("--accent");
      danger = css("--danger");
      fg = css("--fg");
    };

    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) raf = requestAnimationFrame(step);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);

    if (reduced) {
      // Static single frame — still shows the gate, no motion
      running = true;
      step();
      cancelAnimationFrame(raf);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full opacity-70"
    />
  );
}