"use client";

import { useEffect, useRef } from "react";

export default function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const SPACING = 44;
    const LINE_COLOR_BASE = "rgba(255,255,255,";
    const COLS = Math.ceil(width / SPACING) + 2;
    const ROWS = Math.ceil(height / SPACING) + 2;

    const draw = () => {
      // smooth lerp kursor
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * SPACING - SPACING;
          const baseY = r * SPACING - SPACING;

          // jarak dari kursor
          const dx = baseX - mouseX;
          const dy = baseY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 280);

          // titik digeser kearah berlawanan kursor
          const px = baseX - dx * influence * 0.18;
          const py = baseY - dy * influence * 0.18;

          // opacity berdasarkan jarak kursor
          const alpha = 0.06 + influence * 0.22;

          // gambar titik kecil
          ctx.beginPath();
          ctx.arc(px, py, 1.5 + influence * 2, 0, Math.PI * 2);
          ctx.fillStyle = `${LINE_COLOR_BASE}${alpha})`;
          ctx.fill();

          // gambar garis ke kanan
          if (c < cols - 1) {
            const nx = (c + 1) * SPACING - SPACING;
            const ny = baseY;
            const ndx = nx - mouseX;
            const ndy = ny - mouseY;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
            const nInfluence = Math.max(0, 1 - ndist / 280);
            const npx = nx - ndx * nInfluence * 0.18;
            const npy = ny - ndy * nInfluence * 0.18;

            const lineAlpha = (alpha + 0.06 + nInfluence * 0.22) / 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(npx, npy);
            ctx.strokeStyle = `${LINE_COLOR_BASE}${lineAlpha * 0.5})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          // gambar garis ke bawah
          if (r < rows - 1) {
            const nx = baseX;
            const ny = (r + 1) * SPACING - SPACING;
            const ndx = nx - mouseX;
            const ndy = ny - mouseY;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
            const nInfluence = Math.max(0, 1 - ndist / 280);
            const npx = nx - ndx * nInfluence * 0.18;
            const npy = ny - ndy * nInfluence * 0.18;

            const lineAlpha = (alpha + 0.06 + nInfluence * 0.22) / 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(npx, npy);
            ctx.strokeStyle = `${LINE_COLOR_BASE}${lineAlpha * 0.5})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    // fallback: track di window juga
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    rafId = requestAnimationFrame(draw);

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-bg-canvas"
      aria-hidden="true"
    />
  );
}
