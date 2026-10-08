import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import district from "../../assets/media/riyadh-district.jpeg";

export default function VenueSection() {
  return (
    <section id="venue" className="section venue-section">
      <div className="container venue-grid">
        <div className="venue-photo">
          <img
            src={district}
            alt="Modern towers and palm-lined walkways in Riyadh’s financial district"
            width={1024}
            height={1024}
            loading="lazy"
          />

          <span>
            <MapPin /> RIYADH, SAUDI ARABIA
          </span>
        </div>

        <div className="venue-content">
          <p className="eyebrow">05 / THE DESTINATION</p>

          <h2>
            A city of ambition.
            <br />
            <span>A fitting meeting place.</span>
          </h2>

          <p>
            Experience the energy of Riyadh, a city where bold vision, rich
            heritage and a dynamic business landscape come together.
          </p>

          <div className="venue-detail">
            <Building2 />

            <div>
              <h3>In the heart of Riyadh</h3>
              <p>
                Summit venue to be announced.
                <br />
                15 – 17 October 2026
              </p>
            </div>
          </div>

          <div className="venue-detail">
            <MapPin />

            <div>
              <h3>Plan your stay</h3>
              <p>
                Recommended hotels, delegate rates and travel guidance will be
                shared once the venue is confirmed.
              </p>
            </div>
          </div>

          <a
            className="btn-outline venue-link"
            href="https://www.google.com/maps/search/Riyadh+Saudi+Arabia"
            target="_blank"
            rel="noreferrer"
          >
            Explore Riyadh <ArrowUpRight />
          </a>

          <p className="image-note">
            Illustrative view of Riyadh. Not the confirmed event venue.
          </p>
        </div>
      </div>
    </section>
  );
}
