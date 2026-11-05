import React, { useEffect, useRef } from 'react';

export default function ReactorCursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    const anchor = document.querySelector('.reactor-dock');
    if (!cursor || !anchor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let raf = 0;
    const dock = () => {
      const box = anchor.getBoundingClientRect();
      cursor.style.setProperty('--cursor-x', `${box.left + box.width / 2}px`);
      cursor.style.setProperty('--cursor-y', `${box.top + box.height / 2}px`);
    };
    const move = (event) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cursor.classList.add('is-away');
        cursor.classList.remove('is-returning');
        cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
        cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
      });
    };
    const returnHome = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        dock();
        cursor.classList.remove('is-away');
        cursor.classList.add('is-returning');
        anchor.classList.add('reactor-powered');
        window.setTimeout(() => anchor.classList.remove('reactor-powered'), 900);
      });
    };
    dock();
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', returnHome);
    window.addEventListener('blur', returnHome);
    window.addEventListener('resize', dock);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', returnHome);
      window.removeEventListener('blur', returnHome);
      window.removeEventListener('resize', dock);
    };
  }, []);
  return <div ref={cursorRef} className="reactor-cursor" aria-hidden="true"><svg viewBox="0 0 40 48"><path d="M20 3 36 40 20 32 4 40 20 3Z" /><path d="M20 13 28 34 20 30 12 34 20 13Z" /></svg></div>;
}

export function ReactorDock() {
  return <span className="reactor-dock" aria-hidden="true"><span className="reactor-dock-core" /></span>;
}
