"use client";

import { useEffect, useRef } from "react";

export default function LuxuryBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
        };

        // Observe body height changes
        const resizeObserver = new ResizeObserver(() => {
            resize();
        });
        resizeObserver.observe(document.body);
        resize();

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            opacityDir: number;
            color: string;
            pulseSpeed: number;

            constructor(canvasW: number, canvasH: number) {
                this.x = Math.random() * canvasW;
                this.y = Math.random() * canvasH;
                this.vx = (Math.random() - 0.5) * 0.15;
                this.vy = (Math.random() - 0.5) * 0.15;
                this.size = Math.random() * 1.5 + 0.3;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.opacityDir = Math.random() > 0.5 ? 1 : -1;
                this.pulseSpeed = Math.random() * 0.003 + 0.001;

                // Gold-biased color palette
                const colors = [
                    "212, 175, 55",   // gold
                    "232, 197, 90",   // light gold
                    "179, 143, 54",   // dark gold
                    "255, 255, 255",  // white (rare sparkle)
                    "212, 175, 55",   // gold again (more weight)
                    "180, 160, 120",  // warm silver
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(canvasW: number, canvasH: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Pulse opacity
                this.opacity += this.opacityDir * this.pulseSpeed;
                if (this.opacity > 0.6) { this.opacity = 0.6; this.opacityDir = -1; }
                if (this.opacity < 0.05) { this.opacity = 0.05; this.opacityDir = 1; }

                // Wrap around
                if (this.x < 0) this.x = canvasW;
                if (this.x > canvasW) this.x = 0;
                if (this.y < 0) this.y = canvasH;
                if (this.y > canvasH) this.y = 0;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();

                // Glow effect
                if (this.size > 1) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${this.color}, ${this.opacity * 0.1})`;
                    ctx.fill();
                }
            }
        }

        // Create particles
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 120);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        // Floating aurora orbs
        const orbs = [
            { x: 0.2, y: 0.3, radius: 300, color: "212, 175, 55", speed: 0.0003, phase: 0 },
            { x: 0.8, y: 0.15, radius: 250, color: "179, 143, 54", speed: 0.0004, phase: 2 },
            { x: 0.5, y: 0.6, radius: 350, color: "212, 175, 55", speed: 0.00025, phase: 4 },
            { x: 0.15, y: 0.8, radius: 200, color: "232, 197, 90", speed: 0.00035, phase: 1 },
            { x: 0.85, y: 0.7, radius: 280, color: "179, 143, 54", speed: 0.0003, phase: 3 },
        ];

        let time = 0;

        const drawConnections = (ctx: CanvasRenderingContext2D) => {
            const connectionDistance = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 1;

            // Draw aurora orbs (subtle gradient blobs)
            for (const orb of orbs) {
                const ox = orb.x * canvas.width + Math.sin(time * orb.speed + orb.phase) * 80;
                const oy = orb.y * canvas.height + Math.cos(time * orb.speed * 1.3 + orb.phase) * 60;

                const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
                gradient.addColorStop(0, `rgba(${orb.color}, 0.03)`);
                gradient.addColorStop(0.5, `rgba(${orb.color}, 0.01)`);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.beginPath();
                ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Update & draw particles
            for (const p of particles) {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            }

            // Draw connections (constellation effect)
            drawConnections(ctx);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            resize();
            // Recreate particles for new canvas size
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 120);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}
