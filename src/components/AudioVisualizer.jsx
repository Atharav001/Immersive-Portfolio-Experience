import React, { useEffect, useRef } from 'react';

export default function AudioVisualizer({ isActive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw multi-layered glowing sinewaves
      const waves = [
        { color: 'rgba(168, 124, 255, 0.85)', speed: 0.05, amp: 24, freq: 0.02 },
        { color: 'rgba(99, 102, 241, 0.65)', speed: 0.03, amp: 18, freq: 0.025 },
        { color: 'rgba(236, 72, 153, 0.45)', speed: 0.07, amp: 12, freq: 0.015 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 12;

        for (let x = 0; x < width; x++) {
          const envelope = Math.sin((x / width) * Math.PI); // Pinches ends to zero
          const y = centerY + Math.sin(x * wave.freq + phase * wave.speed) * wave.amp * envelope * (isActive ? 1 : 0.2);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      phase += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return (
    <div className="relative w-full max-w-md h-20 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={80}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}
