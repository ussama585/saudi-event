import { pillars } from "./data";

export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / THE SUMMIT</p>

            <h2>
              Big ambitions.
              <br />
              <span>A shared tomorrow.</span>
            </h2>
          </div>

          <div className="about-intro">
            <p>
              A meeting point for the leaders, thinkers and changemakers shaping
              the next chapter of business.
            </p>

            <p>
              Riyadh Business Summit brings together regional ambition and
              global perspective to explore new opportunities, spark innovation
              and build partnerships that last.
            </p>
          </div>
        </div>

        <div className="about-pillars">
          {pillars.map((item) => {
            const Icon = item.icon;

            return (
              <div className="pillar" key={item.number}>
                <div className="pillar-top">
                  <Icon />
                  <span>{item.number}</span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
