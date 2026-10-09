import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import ScrollMap from "./ScrollMap.jsx";

const mapLink = "https://share.google/mTRWUIsOwHs5NYIn8";

export default function MapSection() {
  return (
    <section
      id="location"
      className="section-space location-section"
      aria-labelledby="location-title"
    >
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5 location-copy" data-reveal="left">
            <p className="eyebrow">THE DESTINATION</p>
            <h2 id="location-title">
              Find your way.
              <br />
              <span>Make a connection.</span>
            </h2>
            <p className="location-intro">
              Your next conversation starts here. Explore the location and plan
              your journey.
            </p>
            <div className="location-address">
              <MapPin size={24} strokeWidth={1.5} />
              <div>
                <h3>Riyadh Exhibition &amp; Convention Center</h3>
                <p>
                  Malham, Riyadh
                  <br />
                  Saudi Arabia
                </p>
              </div>
            </div>
            <a
              className="summit-button"
              href={mapLink}
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="col-lg-7" data-reveal="right">
            <div className="location-map">
              <ScrollMap />
              <a
                className="location-map-footer"
                href={mapLink}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <Navigation size={18} />
                  EXPLORE THE LOCATION
                </span>
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
