import {
  ArrowUpRight,
  AudioLines,
  Box,
  Bot,
  Camera,
  Cloud,
  Code2,
  Globe,
  Megaphone,
  Newspaper,
  Sparkles,
  Smartphone,
  Workflow,
} from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';

const SERVICES = [
  {
    number: '01',
    title: 'Web apps & platforms',
    description: 'Custom web products, portals, dashboards, and SaaS platforms made for real people and real workflows.',
    icon: Code2,
    tone: 'lime',
  },
  {
    number: '02',
    title: 'Mobile applications',
    description: 'Thoughtful iOS and Android experiences, from early prototypes to polished apps ready for the store.',
    icon: Smartphone,
    tone: 'peach',
  },
  {
    number: '03',
    title: 'AI agents & copilots',
    description: 'Useful AI that can search, reason, and take action across your knowledge, tools, and business processes.',
    icon: Bot,
    tone: 'lavender',
  },
  {
    number: '04',
    title: 'Voice AI agents',
    description: 'Natural voice experiences for customer support, booking, lead qualification, and everyday operations.',
    icon: AudioLines,
    tone: 'blue',
  },
  {
    number: '05',
    title: '3D, motion & immersive',
    description: 'Expressive 3D product visuals, interactive web experiences, animation, and spatial storytelling.',
    icon: Box,
    tone: 'peach',
  },
  {
    number: '06',
    title: 'Websites & commerce',
    description: 'Distinctive brand sites and online stores that load quickly, tell your story, and make it easy to act.',
    icon: Globe,
    tone: 'lime',
  },
  {
    number: '07',
    title: 'Cloud hosting & DevOps',
    description: 'Managed deployments, cloud infrastructure, monitoring, backups, and ongoing updates as you grow.',
    icon: Cloud,
    tone: 'blue',
  },
  {
    number: '08',
    title: 'Integrations & automation',
    description: 'Connect your apps, data, and teams. Replace repetitive handoffs with dependable automated workflows.',
    icon: Workflow,
    tone: 'lavender',
  },
  {
    number: '09',
    title: 'Social Media (End to End)',
    description: 'From concept to creation to execution, we plan, make, and manage social content around your brand.',
    icon: Sparkles,
    tone: 'lavender',
  },
  {
    number: '10',
    title: 'Brand Shoots',
    description: 'Photography and video that give your brand a distinct, consistent presence across every channel.',
    icon: Camera,
    tone: 'peach',
  },
  {
    number: '11',
    title: 'Performance Marketing',
    description: 'Paid campaigns built to reach the right people, make every rupee work harder, and drive enquiries.',
    icon: Megaphone,
    tone: 'blue',
  },
  {
    number: '12',
    title: 'Press Releases',
    description: 'Clear, newsworthy announcements shaped for your launch, milestone, or next big story.',
    icon: Newspaper,
    tone: 'peach',
  },
  {
    number: '13',
    title: 'AI Automation',
    description: 'AI tools and business transformation through practical, automated workflows that simplify how your team works.',
    icon: Bot,
    tone: 'lime',
  },
];

const CAPABILITIES = [
  'User accounts & onboarding',
  'Payments & subscriptions',
  'Admin dashboards',
  'Bookings & commerce',
  'Analytics & reporting',
  'APIs & integrations',
  'Notifications & messaging',
  'Multi-language support',
];

export function Services() {
  return (
    <section id="services" className="services-section section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="section-heading-row" data-reveal>
          <div className="max-w-2xl">
            <div className="eyebrow"><span className="eyebrow-line" /> What we make</div>
            <h2 className="section-title mt-5">Technology that feels<br className="hidden sm:block" /> like <span className="text-accent">your unfair advantage.</span></h2>
          </div>
          <p className="section-intro">From the first sketch to the systems behind it, we bring design, engineering, and intelligence together in one place.</p>
        </div>

        <div className="service-grid mt-12 sm:mt-16">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.number} className="service-card group" data-reveal>
                <div className="flex items-start justify-between gap-4">
                  <span className={`service-icon icon-${service.tone}`}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                  <span className="service-number">{service.number}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact" className="service-link" aria-label={`Discuss ${service.title}`}>
                  Let’s build it <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>

        <section className="marketing-feature mt-8" aria-labelledby="marketing-feature-title" data-reveal>
          <div className="marketing-feature-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> Creative, media, and growth</div>
            <h3 id="marketing-feature-title">Make every<br />touchpoint count.</h3>
            <p>Bring strategy, creative, media, and follow-up together. From the first campaign idea to the conversation that closes the loop.</p>
            <div className="marketing-pills"><span>Paid ads</span><span>Social content</span><span>Brand shoots</span><span>PR & launches</span></div>
            <a href="#contact" className="button button-dark mt-7"><BrandGlyph variant="button" /> Plan a campaign <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="marketing-feature-art">
            <img src="/assets/marketing-studio-3d.png" alt="Colorful 3D campaign studio with creative cards, a mobile device, and growth analytics" />
            <div className="campaign-float-label"><span className="campaign-spark">✳</span><span><b>Strategy meets creativity</b><small>One connected growth system</small></span></div>
          </div>
        </section>

        <div className="services-note mt-7" data-reveal>
          <span className="note-spark">✳</span>
          <p><b>Have a different idea?</b> We shape the right mix of technology around the problem you need to solve.</p>
          <a href="#contact" aria-label="Talk to us about your idea"><ArrowUpRight size={18} /></a>
        </div>

        <div className="capability-bar mt-14" data-reveal>
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> Product capabilities</div>
            <p>All the pieces behind a complete product.</p>
          </div>
          <div className="capability-chips">
            {CAPABILITIES.map((capability) => <span key={capability}>{capability}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
