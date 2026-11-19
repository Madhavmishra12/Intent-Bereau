import { ArrowDown, ArrowUpRight, AudioLines, Bot, Code2, Sparkles } from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grain" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="relative z-10 max-w-2xl">
          <div className="eyebrow eyebrow-light"><span className="status-dot" /> Independent digital product studio</div>
          <h1 className="hero-title mt-7">
            Big ideas,<br />
            <span className="hero-title-accent">beautifully</span> built.
          </h1>
          <p className="hero-copy mt-6 max-w-xl">
            We design and build the digital products behind your next big move — from mobile and web apps to AI agents, immersive 3D, and the infrastructure that keeps it all running.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="button button-lime">
              <BrandGlyph variant="button" /> Start a project <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#services" className="button button-ghost-light">
              Explore what we do <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-proof mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="proof-avatars" aria-hidden="true"><i>✳</i><i>✦</i><i>↗</i></span>
            <span>Strategy to launch. One connected team.</span>
          </div>
        </div>

        <div className="hero-art" aria-label="A preview of connected digital products, AI, and app interfaces" role="img">
          <div className="art-grid" aria-hidden="true" />
          <div className="art-orbit orbit-one" aria-hidden="true" />
          <div className="art-orbit orbit-two" aria-hidden="true" />
          <div className="art-glow" aria-hidden="true" />
          <div className="art-core" aria-hidden="true"><span>ib</span><i /></div>

          <div className="floating-card app-card">
            <div className="mini-window-top"><span /><span /><span /><b>orbit / dashboard</b></div>
            <div className="mini-window-content">
              <div className="mini-sidebar"><i /><i /><i /><i /></div>
              <div className="mini-dashboard">
                <div className="mini-greeting"><b>Good morning, Alex</b><small>Your workspace at a glance</small></div>
                <div className="mini-stats"><span><small>Active users</small><b>12,480 <em>↗ 18%</em></b></span><span><small>Conversion</small><b>8.42%</b></span></div>
                <div className="chart-wrap"><div className="chart-label"><b>Product activity</b><small>Last 7 days</small></div><svg viewBox="0 0 320 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70 C28 61 30 75 60 53 S91 63 121 40 S159 58 184 34 S225 41 248 22 S282 40 320 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M0 70 C28 61 30 75 60 53 S91 63 121 40 S159 58 184 34 S225 41 248 22 S282 40 320 8 V90 H0Z" fill="url(#chartFill)" opacity=".16"/><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--gold)"/><stop offset="1" stopColor="var(--gold)" stopOpacity="0"/></linearGradient></defs></svg></div>
              </div>
            </div>
          </div>

          <div className="floating-card phone-card" aria-hidden="true">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-topline"><span>9:41</span><span>● ● ●</span></div>
              <div className="phone-orb"><Sparkles size={23} /></div>
              <b>Your day,<br />in flow.</b>
              <small>Everything important,<br />all in one place.</small>
              <div className="phone-action">Open workspace <ArrowUpRight size={12} /></div>
            </div>
          </div>

          <div className="floating-tag tag-ai"><span className="tag-icon"><Bot size={15} /></span><span><b>AI agent</b><small>Ready to help</small></span><i /></div>
          <div className="floating-tag tag-voice"><span className="tag-icon tag-icon-teal"><AudioLines size={15} /></span><span><b>Voice AI</b><small>Always listening</small></span><i /></div>
          <div className="art-caption"><Code2 size={14} aria-hidden="true" /> Thoughtfully connected, end to end</div>
        </div>
      </div>

      <div className="hero-bottom mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-12">
        <p>One partner for every digital layer</p>
        <div className="hero-capabilities"><span>PRODUCT DESIGN</span><i /> <span>ENGINEERING</span><i /> <span>AI & AUTOMATION</span><i /> <span>HOSTING & CARE</span></div>
      </div>
    </section>
  );
}
