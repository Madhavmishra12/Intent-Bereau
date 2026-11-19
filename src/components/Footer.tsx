import { ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL } from './Contact';
import { BrandGlyph } from './BrandGlyph';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <a href="#top" aria-label="Intent Bureau home" className="brand-mark footer-brand">
          <BrandGlyph />
          <span className="brand-name">intent<span>bureau</span></span>
        </a>
        <nav aria-label="Footer navigation" className="footer-links">
          <a href="#services">Services</a><a href="#approach">Approach</a><a href="#about">About</a><a href="#clientele">Clientele</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Email us <ArrowUpRight size={13} /></a>
        </nav>
        <p className="footer-copyright">© {new Date().getFullYear()} Intent Bureau. Made with intent.</p>
      </div>
    </footer>
  );
}
