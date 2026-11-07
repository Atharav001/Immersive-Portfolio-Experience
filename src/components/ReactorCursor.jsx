import React, { useEffect, useRef } from 'react';

const clamp01 = (value) => Math.max(0, Math.min(1, value));

export default function ReactorCursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    const anchor = document.querySelector('.reactor-dock');
    if (!cursor || !anchor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let returnFrame = 0;
    let x = 0;
    let y = 0;
    let initialized = false;
    const setPose = (nextX, nextY, angle) => {
      x = nextX;
      y = nextY;
      cursor.style.setProperty('--cursor-x', `${nextX}px`);
      cursor.style.setProperty('--cursor-y', `${nextY}px`);
      cursor.style.setProperty('--cursor-rotation', `${angle}deg`);
    };
    const dockCenter = () => {
      const box = anchor.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    };
    const move = (event) => {
      cancelAnimationFrame(returnFrame);
      cursor.classList.remove('is-docked', 'is-returning');
      anchor.classList.remove('reactor-arrival');
      setPose(event.clientX, event.clientY, 0);
      initialized = true;
    };
    const returnHome = (event) => {
      if (!initialized || cursor.classList.contains('is-returning')) return;
      cancelAnimationFrame(returnFrame);
      const start = { x: Number.isFinite(event?.clientX) ? event.clientX : x, y: Number.isFinite(event?.clientY) ? event.clientY : y };
      const end = dockCenter();
      const control = { x: start.x + (end.x - start.x) * 0.55, y: Math.max(18, Math.min(start.y, end.y) - Math.min(160, innerHeight * 0.18)) };
      const begun = performance.now();
      const duration = 1080;
      cursor.classList.add('is-returning');
      cursor.classList.remove('is-docked');
      const animate = (now) => {
        const t = clamp01((now - begun) / duration);
        const travel = clamp01((t - 0.06) / 0.94);
        const ease = 1 - Math.pow(1 - travel, 3.4);
        const inverse = 1 - ease;
        const nextX = inverse * inverse * start.x + 2 * inverse * ease * control.x + ease * ease * end.x;
        const nextY = inverse * inverse * start.y + 2 * inverse * ease * control.y + ease * ease * end.y;
        const rotation = 180 * clamp01(t / 0.3);
        setPose(nextX, nextY, rotation);
        if (t < 1) returnFrame = requestAnimationFrame(animate);
        else {
          cursor.classList.remove('is-returning');
          cursor.classList.add('is-docked');
          anchor.classList.add('reactor-arrival');
          window.setTimeout(() => anchor.classList.remove('reactor-arrival'), 1300);
        }
      };
      returnFrame = requestAnimationFrame(animate);
    };
    const resize = () => {
      if (cursor.classList.contains('is-docked')) {
        const p = dockCenter();
        setPose(p.x, p.y, 180);
      }
    };
    const initial = dockCenter();
    setPose(initial.x, initial.y, 180);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', returnHome);
    window.addEventListener('blur', returnHome);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(returnFrame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', returnHome);
      window.removeEventListener('blur', returnHome);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <div ref={cursorRef} className="reactor-cursor is-docked" aria-hidden="true"><svg viewBox="0 0 40 40"><path className="cursor-triangle" d="M20 3 L37.32 33 L2.68 33 Z" /><path className="cursor-core" d="M20 10.5 L30.1 28 L9.9 28 Z" /></svg></div>;
}

export function ReactorDock() {
  return (
    <span className="reactor-dock" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <circle className="dock-ring-outer" cx="50" cy="50" r="46" />
        <circle className="dock-ring-middle" cx="50" cy="50" r="40" />
        <circle className="dock-ring-inner" cx="50" cy="50" r="35" />
        <path className="dock-brace" d="M50 5V14 M50 86V95 M11 27.5L18.8 32 M81.2 68L89 72.5 M11 72.5L18.8 68 M81.2 32L89 27.5" />
        <path className="dock-triangle-outer" d="M20 31 L80 31 L50 82.96 Z" />
        <path className="dock-triangle-inner" d="M32 38 L68 38 L50 69.18 Z" />
      </svg>
    </span>
  );
}
