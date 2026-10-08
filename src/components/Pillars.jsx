import { ArrowUpRight, TrendingUp, Sparkles, Handshake } from "lucide-react";

const pillars = [
  {
    icon: TrendingUp,
    title: "Growth without limits",
    text: "Explore emerging opportunities and the ideas shaping a more resilient economy.",
    tag: "ECONOMIC GROWTH",
  },
  {
    icon: Sparkles,
    title: "Ideas into impact",
    text: "Connect technology, entrepreneurial thinking and the next generation of business.",
    tag: "INNOVATION",
  },
  {
    icon: Handshake,
    title: "Stronger connections",
    text: "Bring regional ambition and global perspectives together through meaningful partnerships.",
    tag: "COLLABORATION",
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="section-space pillars-section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">02 / OUR PILLARS</p>
            <h2>
              Three perspectives.
              <br />
              <span>Infinite possibilities.</span>
            </h2>
          </div>
          <p>
            The conversations that matter.
            <br />
            The opportunities that come next.
          </p>
        </div>
        <div className="row g-4">
          {pillars.map(({ icon: Icon, title, text, tag }, index) => (
            <div className="col-md-4" key={tag} data-reveal>
              <article className="pillar-card">
                <div className="pillar-top">
                  <Icon size={36} strokeWidth={1.3} />
                  <span>0{index + 1}</span>
                </div>
                <p className="eyebrow">{tag}</p>
                <h3>{title}</h3>
                <p>{text}</p>
                <a
                  href="#agenda"
                  aria-label={`Explore ${tag.toLowerCase()} in the programme`}
                >
                  <ArrowUpRight size={24} />
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
