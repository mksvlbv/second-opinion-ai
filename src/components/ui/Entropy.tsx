"use client";

import { useEffect, useRef } from "react";

interface EntropyProps {
  className?: string;
}

// Move class declaration outside to satisfy ESLint and prevent re-declaration on every render
class Particle {
  x: number;
  y: number;
  size: number;
  order: boolean;
  velocity: { x: number; y: number };
  originalX: number;
  originalY: number;
  influence: number;
  neighbors: Particle[];

  constructor(x: number, y: number, order: boolean) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.size = 2;
    this.order = order; // true for right side (structure), false for left side (chaos)
    this.velocity = {
      x: (Math.random() - 0.5) * 1.5,
      y: (Math.random() - 0.5) * 1.5,
    };
    this.influence = 0;
    this.neighbors = [];
  }

  update(width: number, height: number) {
    if (this.order) {
      const dx = this.originalX - this.x;
      const dy = this.originalY - this.y;

      const chaosInfluence = { x: 0, y: 0 };
      this.neighbors.forEach((neighbor) => {
        if (!neighbor.order) {
          const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y);
          const strength = Math.max(0, 1 - distance / 150);
          chaosInfluence.x += neighbor.velocity.x * strength;
          chaosInfluence.y += neighbor.velocity.y * strength;
          this.influence = Math.max(this.influence, strength);
        }
      });

      this.x += dx * 0.08 * (1 - this.influence) + chaosInfluence.x * this.influence;
      this.y += dy * 0.08 * (1 - this.influence) + chaosInfluence.y * this.influence;
      this.influence *= 0.95;
    } else {
      this.velocity.x += (Math.random() - 0.5) * 0.2;
      this.velocity.y += (Math.random() - 0.5) * 0.2;
      
      const speed = Math.hypot(this.velocity.x, this.velocity.y);
      if(speed > 1.5) {
         this.velocity.x = (this.velocity.x / speed) * 1.5;
         this.velocity.y = (this.velocity.y / speed) * 1.5;
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (this.x < 0 || this.x > width / 2) this.velocity.x *= -1;
      if (this.y < 0 || this.y > height) this.velocity.y *= -1;
      
      this.x = Math.max(0, Math.min(width / 2, this.x));
      this.y = Math.max(0, Math.min(height, this.y));
    }
  }

  draw(ctx: CanvasRenderingContext2D, particleRGB: string) {
    const alpha = this.order ? 0.4 - this.influence * 0.2 : 0.35;
    ctx.fillStyle = `rgba(${particleRGB}, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function Entropy({ className = "" }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const particleRGB = "44, 62, 52"; 

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener("resize", resize);
    resize();

    let particles: Particle[] = [];
    const initParticles = () => {
        particles = [];
        const spacing = 45;
        const cols = Math.floor(width / spacing);
        const rows = Math.floor(height / spacing);

        for (let i = 0; i <= cols; i++) {
          for (let j = 0; j <= rows; j++) {
            const x = spacing * i + (spacing / 2);
            const y = spacing * j + (spacing / 2);
            const order = x > width / 2; 
            particles.push(new Particle(x, y, order));
          }
        }
    }
    initParticles();

    function updateNeighbors() {
      particles.forEach((particle) => {
        particle.neighbors = particles.filter((other) => {
          if (other === particle) return false;
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          return distance < 100;
        });
      });
    }

    let time = 0;
    let animationId: number;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (time % 30 === 0) {
        updateNeighbors();
      }

      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx, particleRGB);

        particle.neighbors.forEach((neighbor) => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);
          if (distance < 80) {
            const alpha = 0.15 * (1 - distance / 80);
            ctx.strokeStyle = `rgba(${particleRGB}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        });
      });

      ctx.strokeStyle = `rgba(${particleRGB}, 0.08)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      time++;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    let resizeTimeout: NodeJS.Timeout;
    const handleResizeEnd = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initParticles();
        }, 200);
    }
    window.addEventListener('resize', handleResizeEnd);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener('resize', handleResizeEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
