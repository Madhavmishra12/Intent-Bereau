/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Clientele } from './components/Clientele';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const showAll = () => revealTargets.forEach((target) => target.classList.add('is-visible'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      showAll();
    }

    let observer: IntersectionObserver | undefined;
    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' });

      revealTargets.forEach((target, index) => {
        target.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
        observer?.observe(target);
      });
    }

    // Add a restrained pointer-driven 3D tilt to the visual cards. Touch and
    // reduced-motion users keep the same layout without the pointer effect.
    const canTilt = !reducedMotion.matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const tiltTargets = canTilt
      ? Array.from(document.querySelectorAll<HTMLElement>([
          '.hero-art', '.service-card', '.marketing-feature', '.approach-card',
          '.client-logo-card', '.contact-form-card',
        ].join(',')))
      : [];

    let animationFrame = 0;
    let activeTarget: HTMLElement | null = null;
    let pendingPointer: PointerEvent | null = null;

    const applyTilt = () => {
      animationFrame = 0;
      if (!activeTarget || !pendingPointer) return;
      const bounds = activeTarget.getBoundingClientRect();
      const x = (pendingPointer.clientX - bounds.left) / bounds.width - 0.5;
      const y = (pendingPointer.clientY - bounds.top) / bounds.height - 0.5;
      activeTarget.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
      activeTarget.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
      activeTarget.style.setProperty('--pointer-x', `${(x + 0.5) * 100}%`);
      activeTarget.style.setProperty('--pointer-y', `${(y + 0.5) * 100}%`);
    };

    const onPointerEnter = (event: PointerEvent) => {
      activeTarget = event.currentTarget as HTMLElement;
      activeTarget.classList.add('motion-tilt');
      activeTarget.classList.add('is-tilting');
    };
    const onPointerMove = (event: PointerEvent) => {
      activeTarget = event.currentTarget as HTMLElement;
      pendingPointer = event;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(applyTilt);
    };
    const onPointerLeave = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.classList.remove('is-tilting');
      target.style.setProperty('--tilt-x', '0deg');
      target.style.setProperty('--tilt-y', '0deg');
      activeTarget = null;
      pendingPointer = null;
    };

    tiltTargets.forEach((target) => {
      target.addEventListener('pointerenter', onPointerEnter);
      target.addEventListener('pointermove', onPointerMove);
      target.addEventListener('pointerleave', onPointerLeave);
    });

    return () => {
      observer?.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      tiltTargets.forEach((target) => {
        target.removeEventListener('pointerenter', onPointerEnter);
        target.removeEventListener('pointermove', onPointerMove);
        target.removeEventListener('pointerleave', onPointerLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[var(--lime)] focus:text-[var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Hero />
        <Services />
        <About />
        <Clientele />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
