import { ArrowUpRight } from "lucide-react";
import { speakerItems } from "./data";

export default function SpeakersSection({ setSpeaker }) {
  return (
    <section id="speakers" className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / THE VOICES</p>

            <h2>
              Perspectives that
              <br />
              <span>inspire progress.</span>
            </h2>
          </div>
        </div>

        <div className="speaker-grid">
          {speakerItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <article className="speaker-card" key={item.track}>
                <div className={`speaker-art speaker-art-${index}`}>
                  <Icon strokeWidth={0.7} />
                  <span>KEYNOTE / 0{index + 1}</span>
                </div>

                <div className="speaker-info">
                  <p className="eyebrow">{item.track}</p>
                  <h3>{item.title}</h3>
                  <p>{item.topic}</p>

                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setSpeaker(index)}
                  >
                    Speaker to be announced <ArrowUpRight />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
