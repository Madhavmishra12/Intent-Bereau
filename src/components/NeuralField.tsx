import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; z: number; phase: number; size: number };
type ProjectedParticle = { x: number; y: number; z: number; alpha: number; size: number };

/** A small, brand-colored 3D particle field, rendered locally with Canvas 2D. */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const seedParticles = () => {
      particles.length = 0;
      const count = width < 600 ? 260 : 410;

      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const tubeAngle = Math.random() * Math.PI * 2;
        const majorRadius = .76 + Math.random() * .46;
        const tubeRadius = (Math.random() ** .7) * .36;
        const radius = majorRadius + Math.cos(tubeAngle) * tubeRadius;
        particles.push({
          x: Math.cos(angle) * radius * 1.28,
          y: Math.sin(angle) * radius * .62,
          z: Math.sin(tubeAngle) * tubeRadius + (Math.random() - .5) * .22,
          phase: Math.random() * Math.PI * 2,
          size: .55 + Math.random() * 1.25,
        });
      }

      // A sparse outer cloud makes the field feel like it continues beyond the ring.
      for (let index = 0; index < Math.floor(count * .24); index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.05 + Math.random() * .72;
        particles.push({
          x: Math.cos(angle) * radius * 1.28,
          y: Math.sin(angle) * radius * .68,
          z: (Math.random() - .5) * 1.15,
          phase: Math.random() * Math.PI * 2,
          size: .45 + Math.random() * .85,
        });
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      seedParticles();
      if (reducedMotion.matches) draw(0);
      else start();
    };

    const draw = (timestamp: number) => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const centerX = width * .5;
      const centerY = height * .5;
      const scale = Math.min(width, height) * .37;
      const time = reducedMotion.matches ? 0 : timestamp * .00011;
      pointerX += (targetX - pointerX) * .045;
      pointerY += (targetY - pointerY) * .045;
      const rotateY = time * .46 + pointerX * .34;
      const rotateX = Math.sin(time * .7) * .12 - pointerY * .2;
      const cosY = Math.cos(rotateY);
      const sinY = Math.sin(rotateY);
      const cosX = Math.cos(rotateX);
      const sinX = Math.sin(rotateX);
      const projected: ProjectedParticle[] = [];

      for (const particle of particles) {
        const x = particle.x * cosY + particle.z * sinY;
        const rotatedZ = -particle.x * sinY + particle.z * cosY;
        const y = particle.y * cosX - rotatedZ * sinX;
        const z = particle.y * sinX + rotatedZ * cosX;
        const perspective = 3.3 / (3.3 + z);
        const shimmer = .64 + Math.sin(time * 2.2 + particle.phase) * .2;
        projected.push({
          x: centerX + x * scale * perspective,
          y: centerY + y * scale * perspective,
          z,
          alpha: Math.max(.14, Math.min(.84, shimmer * (.58 + (1.2 - z) * .15))),
          size: particle.size * perspective,
        });
      }

      // Connect only close points, giving the cloud a fine neural-web texture.
      context.lineWidth = .55;
      for (let index = 0; index < projected.length; index += 1) {
        const point = projected[index];
        for (let next = index + 1; next < Math.min(index + 22, projected.length); next += 1) {
          const neighbor = projected[next];
          const dx = point.x - neighbor.x;
          const dy = point.y - neighbor.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 34 || Math.abs(point.z - neighbor.z) > .5) continue;
          const opacity = (1 - distance / 34) * .14 * Math.min(point.alpha, neighbor.alpha);
          context.strokeStyle = `rgba(247, 226, 216, ${opacity})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.stroke();
        }
      }

      for (const point of projected) {
        context.beginPath();
        context.fillStyle = `rgba(249, 242, 236, ${point.alpha})`;
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();
      }

      // A soft oxblood halo and a porcelain four-point core echo the reference.
      const haloRadius = scale * .77;
      const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, haloRadius);
      halo.addColorStop(0, 'rgba(247, 243, 238, .23)');
      halo.addColorStop(.16, 'rgba(170, 89, 102, .22)');
      halo.addColorStop(.54, 'rgba(112, 38, 54, .12)');
      halo.addColorStop(1, 'rgba(112, 38, 54, 0)');
      context.fillStyle = halo;
      context.fillRect(centerX - haloRadius, centerY - haloRadius, haloRadius * 2, haloRadius * 2);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(time * .14);
      const starSize = Math.max(20, Math.min(39, scale * .105));
      context.shadowColor = 'rgba(247, 243, 238, .72)';
      context.shadowBlur = starSize * .9;
      context.fillStyle = '#F7F3EE';
      context.beginPath();
      context.moveTo(0, -starSize);
      context.quadraticCurveTo(starSize * .16, -starSize * .16, starSize, 0);
      context.quadraticCurveTo(starSize * .16, starSize * .16, 0, starSize);
      context.quadraticCurveTo(-starSize * .16, starSize * .16, -starSize, 0);
      context.quadraticCurveTo(-starSize * .16, -starSize * .16, 0, -starSize);
      context.closePath();
      context.fill();
      context.restore();
    };

    const animate = (timestamp: number) => {
      frameId = 0;
      if (!visible || document.hidden) return;
      draw(timestamp);
      if (!reducedMotion.matches) frameId = window.requestAnimationFrame(animate);
    };

    function start() {
      if (!visible || document.hidden || frameId || reducedMotion.matches) return;
      frameId = window.requestAnimationFrame(animate);
    }

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    };
    const resetPointer = () => { targetX = 0; targetY = 0; };
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        start();
      }
    };
    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
        draw(0);
      } else {
        start();
      }
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else if (frameId) {
            window.cancelAnimationFrame(frameId);
            frameId = 0;
          }
        }, { threshold: .05 })
      : null;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    observer?.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);
    resize();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', resetPointer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-field-canvas" aria-hidden="true" />;
}
