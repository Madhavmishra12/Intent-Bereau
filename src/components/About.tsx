import { Compass, Layers3, Rocket } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Compass,
    title: 'Get clear',
    description: 'We start with your people, your goals, and the problem worth solving. Then we map a practical path forward.',
    detail: 'Strategy · Product discovery',
  },
  {
    number: '02',
    icon: Layers3,
    title: 'Make it real',
    description: 'Design and engineering work side by side, turning a strong direction into a product people can actually use.',
    detail: 'Design · Build · Integrate',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Keep it growing',
    description: 'We launch, host, monitor, and improve your product so it keeps earning its place in your business.',
    detail: 'Launch · Hosting · Ongoing care',
  },
];

const INDUSTRIES = ['Hospitality', 'Real estate', 'Telecom', 'Fashion', 'Events'];

export function About() {
  return (
    <>
      <section id="approach" className="approach-section section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="section-heading-row approach-heading">
            <div className="max-w-2xl">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> How we work</div>
              <h2 className="section-title section-title-light mt-5">One clear path<br />from <span>idea to impact.</span></h2>
            </div>
            <p className="section-intro section-intro-light">The best work happens when the people shaping your product stay close from the first conversation through launch and beyond.</p>
          </div>

          <div className="approach-grid mt-12 sm:mt-16">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="approach-card">
                  <div className="approach-card-top"><span>{step.number}</span><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="approach-detail">{step.detail}</div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> A little about us</div>
            <h2 className="about-title mt-5">Small details.<br /><span>Big-picture thinking.</span></h2>
          </div>
          <div>
            <p className="about-copy">Intent Bureau is a digital product studio based in New Delhi. We bring creative direction, thoughtful technology, and practical business sense together to make digital experiences that move things forward.</p>
            <div className="about-meta mt-7">
              <div><span className="meta-label">Based in</span><b>New Delhi, India</b></div>
              <div><span className="meta-label">Working across</span><div className="industry-tags">{INDUSTRIES.map((industry) => <span key={industry}>{industry}</span>)}</div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
