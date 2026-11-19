/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!revealTargets.length) return;

    const showAll = () => revealTargets.forEach((target) => target.classList.add('is-visible'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' });

    revealTargets.forEach((target, index) => {
      target.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
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
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
