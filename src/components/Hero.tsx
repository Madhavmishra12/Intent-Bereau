import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';
import { NeuralField } from './NeuralField';

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grain" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="relative z-10 max-w-2xl" data-reveal>
          <div className="eyebrow eyebrow-light"><span className="status-dot" /> AI-powered creative tech agency</div>
          <h1 className="hero-title mt-7">
            Big ideas,<br />
            <span className="hero-title-accent">beautifully</span> built.
          </h1>
          <p className="hero-copy mt-6 max-w-xl">
            We are an AI-powered creative tech agency based in India. We build websites, create and manage social content, and run paid campaigns that turn attention into enquiries.
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

        <div className="hero-art neural-scene" aria-label="An animated 3D field of connected particles centered around a bright four-point Intent Bureau spark" role="img" data-reveal>
          <NeuralField />
          <div className="neural-label" aria-hidden="true"><span className="neural-live-dot" /> INTENT FIELD <i>/</i> 001</div>
          <div className="neural-metrics" aria-hidden="true">
            <span><b>13</b><small>CAPABILITIES</small></span>
            <span><b>05</b><small>CLIENT PARTNERS</small></span>
            <span><b>01</b><small>CONNECTED TEAM</small></span>
          </div>
          <div className="art-caption"><span className="neural-caption-mark">✳</span> Creative intelligence, in motion</div>
        </div>
      </div>

      <div className="hero-bottom mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-12">
        <p>One partner for every digital layer</p>
        <div className="hero-capabilities" role="group" aria-label="Product design, engineering, AI and automation, hosting and care">
          <div className="hero-capabilities-track" aria-hidden="true">
            <div className="hero-capabilities-group"><span>PRODUCT DESIGN</span><i /><span>ENGINEERING</span><i /><span>AI & AUTOMATION</span><i /><span>HOSTING & CARE</span><i /></div>
            <div className="hero-capabilities-group"><span>PRODUCT DESIGN</span><i /><span>ENGINEERING</span><i /><span>AI & AUTOMATION</span><i /><span>HOSTING & CARE</span><i /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
