"use client";

import { useEffect, useRef } from "react";

export default function HeroParallax() {
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const frame = frameRef.current;
    if (!bg || !frame) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // normalize ke -1 ... 1 relatif terhadap tengah layar
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;
      targetY = (e.clientY - cy) / cy;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // background bergerak lambat (subtle)
      bg.style.transform = `translate(${currentX * 18}px, ${currentY * 12}px) scale(1.04)`;

      // browser frame bergerak lebih terasa
      frame.style.transform = `translate(${currentX * -22}px, ${currentY * -14}px)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={bgRef} className="hero-parallax-bg" aria-hidden="true" />
      {/* inject ref ke browser frame via data attribute, diambil dari DOM */}
      <div ref={frameRef} className="hero-parallax-frame-wrapper" />
    </>
  );
}
