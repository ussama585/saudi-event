import { ArrowUpRight, Clock3 } from "lucide-react";
import { days } from "./data";

export default function AgendaSection({ day, setDay }) {
  return (
    <section id="agenda" className="section agenda-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / THE PROGRAMME</p>

            <h2>
              Three days.
              <br />
              <span>A world of opportunity.</span>
            </h2>
          </div>
        </div>

        <div className="agenda-tabs" role="tablist" aria-label="Summit days">
          {days.map((item, index) => (
            <button
              type="button"
              key={item.date}
              role="tab"
              aria-selected={day === index}
              aria-controls="day-programme"
              className={`day-tab ${day === index ? "active" : ""}`}
              onClick={() => setDay(index)}
            >
              <span className="day-date">
                DAY 0{index + 1}
                <span>{item.date} 2026</span>
              </span>

              <span>{item.title}</span>
              <ArrowUpRight />
            </button>
          ))}
        </div>

        <div id="day-programme" role="tabpanel" className="agenda-panel">
          <div className="programme-heading">
            <h3>{days[day]?.theme}</h3>
            <span>PROPOSED PROGRAMME</span>
          </div>

          {days[day]?.sessions.map(([time, type, title, stage]) => (
            <div className="session" key={time}>
              <span className="session-time">
                <Clock3 />
                {time}
              </span>

              <div>
                <span className="session-type">{type}</span>
                <h4>{title}</h4>
              </div>

              <span className="session-stage">{stage}</span>
              <ArrowUpRight />
            </div>
          ))}
        </div>

        <p className="programme-note">
          Session timings and topics are indicative. The final programme will be
          announced.
        </p>
      </div>
    </section>
  );
}
