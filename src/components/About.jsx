import { ArrowUpRight } from "lucide-react";
import district from "../assets/media/riyadh-district.jpeg";

export default function About() {
  return (
    <section id="about" className="section-space about-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-reveal="left">
            <div className="about-image">
              <img
                src={district}
                alt="Modern architecture in Riyadh's financial district"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <span className="image-caption">
                RIYADH / A CITY MOVING FORWARD
              </span>
            </div>
          </div>
          <div className="col-lg-6 about-copy" data-reveal="right">
            <p className="eyebrow">01 / THE SUMMIT</p>
            <h2>
              Big ambitions.
              <br />
              <span>A shared tomorrow.</span>
            </h2>
            <p className="lead-copy">
              The future of business is built together.
            </p>
            <p>
              Riyadh Business Summit brings leaders, entrepreneurs and
              innovators into one conversation. Explore new opportunities,
              exchange perspectives and build relationships that reach beyond
              the room.
            </p>
            <div className="about-tags">
              <span>Global perspective</span>
              <span>Local ambition</span>
              <span>Lasting connections</span>
            </div>
            <a className="text-link" href="#pillars">
              Discover what drives us <ArrowUpRight size={20} />
            </a>
            <p className="small-note">
              City imagery is illustrative. The summit venue will be announced.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
