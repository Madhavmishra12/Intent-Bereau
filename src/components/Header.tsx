import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Our approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Clientele', href: '#clientele' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="Intent Bureau home" className="brand-mark group">
          <BrandGlyph />
          <span className="brand-name">intent<span>bureau</span></span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="button button-lime button-small hidden sm:inline-flex">
            <BrandGlyph variant="button" /> Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="menu-toggle md:hidden"
          >
            {mobileMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav md:hidden">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
          ))}
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-cta"><BrandGlyph variant="button" /> Start a project <ArrowUpRight size={16} /></a>
        </nav>
      )}
    </header>
  );
}
