import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import skyline from "../../assets/media/riyadh-skyline.jpeg";

export default function Hero({ openRegister }) {
  return (
    <section className="hero">
      <img
        className="hero-image"
        src={skyline}
        alt="Riyadh skyline at sunset with the illuminated Kingdom Centre"
        width={1920}
        height={1024}
      />

      <div className="hero-shade" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="event-label">
            <span />
            WHERE AMBITION MEETS OPPORTUNITY
          </div>

          <h1>
            Riyadh Business
            <br />
            Summit <span>2026</span>
          </h1>

          <p className="hero-tagline">
            A Platform for a Stronger Business Tomorrow.
          </p>

          <div className="hero-details">
            <span>
              <CalendarDays />
              15 – 17 October 2026
            </span>

            <span>
              <MapPin />
              Riyadh, Saudi Arabia
            </span>
          </div>

          <button
            type="button"
            className="btn-primary hero-cta"
            onClick={() => openRegister()}
          >
            Register Now <ArrowUpRight />
          </button>

          <p className="hero-caption">
            Three days. Meaningful connections. Lasting impact.
          </p>
        </div>

        <div className="hero-bottom">
          <span>
            RIYADH, SAUDI ARABIA
            <span className="hero-coordinate">24.7136° N · 46.6753° E</span>
          </span>

          <a href="#about">
            Discover the summit <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
