const CLIENT_LOGOS = [
  {
    name: 'Q&I Today, by the promoters of India Today Group',
    src: '/assets/clients/qandi-today.svg',
    className: 'client-logo-qandi',
  },
  {
    name: 'India Designer Show',
    src: '/assets/clients/india-designer-show.webp',
    className: 'client-logo-ids',
  },
  {
    name: 'GrowQR Agentic AI',
    src: '/assets/clients/growqr-agentic.png',
    className: 'client-logo-growqr',
  },
  {
    name: 'IDFCC',
    src: '/assets/clients/idfcc.png',
    className: 'client-logo-idfcc',
  },
  {
    name: 'Ophtechnics',
    src: '/assets/clients/ophtechnics.jpg',
    className: 'client-logo-ophtechnics',
  },
];

export function Clientele() {
  return (
    <section id="clientele" className="clientele-section section-pad" aria-labelledby="clientele-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="section-heading-row" data-reveal>
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> Our Clientele</div>
            <h2 id="clientele-title" className="section-title mt-5">Good company.<br /><span className="text-accent">Shared ambition.</span></h2>
          </div>
          <p className="section-intro">A selection of the teams and brands we have had the pleasure of working with.</p>
        </div>

        <ul className="client-logo-grid mt-10 sm:mt-14" aria-label="Intent Bureau clientele">
          {CLIENT_LOGOS.map((client) => (
            <li key={client.name} className="client-logo-card" data-reveal>
              <img className={client.className} src={client.src} alt={client.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
