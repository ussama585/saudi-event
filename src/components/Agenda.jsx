import { useRef, useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { days } from "../data/programme";
import useReveal from "../hooks/useReveal";

export default function Agenda() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useReveal(ref, active);
  const selectWithKeyboard = (event, index) => {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % days.length
        : event.key === "ArrowLeft"
          ? (index + days.length - 1) % days.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? days.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`agenda-tab-${next}`)?.focus();
  };
  return (
    <section id="agenda" className="section-space agenda-section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">04 / THE PROGRAMME</p>
            <h2>
              Three days.
              <br />
              <span>A world of opportunity.</span>
            </h2>
          </div>
          <p>
            A proposed programme of ideas,
            <br />
            insights and new connections.
          </p>
        </div>
        <div className="agenda-tabs" role="tablist" aria-label="Programme day">
          {days.map((day, index) => (
            <button
              type="button"
              id={`agenda-tab-${index}`}
              key={day.date}
              role="tab"
              aria-selected={index === active}
              aria-controls={`agenda-panel-${index}`}
              tabIndex={index === active ? 0 : -1}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              onKeyDown={(event) => selectWithKeyboard(event, index)}
            >
              <span>
                DAY 0{index + 1} / {day.date}
              </span>
              <strong>{day.title}</strong>
              <ArrowUpRight size={20} />
            </button>
          ))}
        </div>
        <div
          ref={ref}
          data-reveal-scope
          role="tabpanel"
          id={`agenda-panel-${active}`}
          aria-labelledby={`agenda-tab-${active}`}
          tabIndex={0}
        >
          <p className="agenda-theme" data-reveal>
            {days[active].theme}
          </p>
          {days[active].sessions.map(([time, type, title, venue]) => (
            <article
              className="agenda-session"
              data-reveal
              key={`${active}-${time}`}
            >
              <time>{time}</time>
              <div>
                <p className="eyebrow">{type}</p>
                <h3>{title}</h3>
              </div>
              <span>
                <MapPin size={16} />
                {venue}
              </span>
            </article>
          ))}
        </div>
        <p className="small-note">
          All times are in Riyadh local time (UTC+3). Programme subject to
          confirmation.
        </p>
      </div>
    </section>
  );
}
