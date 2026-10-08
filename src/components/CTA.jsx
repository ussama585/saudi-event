import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="section-space cta-section">
      <div className="cta-orbit" aria-hidden="true" />
      <div className="container" data-reveal>
        <p className="eyebrow">THE FUTURE DOESN'T WAIT.</p>
        <h2>
          Be in the room.
          <br />
          <span>Be part of what's next.</span>
        </h2>
        <p>15—17 October 2026 · Riyadh, Saudi Arabia</p>
        <Link to="/#registration" className="summit-button">
          Express your interest <ArrowUpRight size={22} />
        </Link>
      </div>
    </section>
  );
}
