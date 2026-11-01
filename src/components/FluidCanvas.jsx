import React, { useEffect, useRef } from 'react';

/**
 * High-performance WebGL / 2D Liquid Fluid Distortion Canvas
 * Mirrors the fluid simulation on yannesidibe.com (curl, swirl, viscosity, velocity dissipation)
 */
export default function FluidCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Fluid particles / velocity ripples
    const ripples = [];
    let lastMouse = { x: 0, y: 0 };
    let isMoving = false;
    let moveTimeout;

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          vx: dx * 0.2,
          vy: dy * 0.2,
          radius: Math.min(speed * 1.5, 90),
          maxRadius: Math.min(speed * 3.5, 180),
          alpha: 0.5,
          color: Math.random() > 0.4 ? 'rgba(168, 124, 255,' : 'rgba(99, 102, 241,',
          rotation: Math.atan2(dy, dx),
        });
      }

      lastMouse = { x: e.clientX, y: e.clientY };
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & dissolve fluid ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vx *= 0.94; // velocity dissipation
        r.vy *= 0.94;
        r.radius += (r.maxRadius - r.radius) * 0.08;
        r.alpha *= 0.92; // density dissipation

        if (r.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        gradient.addColorStop(0, `${r.color} ${r.alpha * 0.45})`);
        gradient.addColorStop(0.5, `${r.color} ${r.alpha * 0.15})`);
        gradient.addColorStop(1, 'transparent');

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] will-change-transform mix-blend-screen"
    />
  );
}
