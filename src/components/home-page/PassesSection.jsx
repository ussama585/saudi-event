import { ArrowUpRight, Check, Ticket } from "lucide-react";
import { passes } from "./data";

export default function PassesSection({ openRegister }) {
  return (
    <section id="passes" className="section passes-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / YOUR SUMMIT EXPERIENCE</p>

            <h2>
              Your ambition.
              <br />
              <span>Your place at the summit.</span>
            </h2>
          </div>
        </div>

        <div className="pass-grid">
          {passes.map((item, index) => (
            <article
              key={item.name}
              className={`pass-card ${index === 1 ? "featured" : ""}`}
            >
              <div className="pass-top">
                <Ticket />

                <span>
                  {index === 1
                    ? "THE EXECUTIVE EXPERIENCE"
                    : `PASS / 0${index + 1}`}
                </span>
              </div>

              <h3>{item.name}</h3>
              <p>{item.label}</p>

              <div className="pass-price">
                Pricing coming soon
                <span>3-day summit pass</span>
              </div>

              <ul>
                {item.perks.map((perk) => (
                  <li key={perk}>
                    <Check />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={index === 1 ? "btn-primary" : "btn-outline"}
                onClick={() => openRegister(item.name)}
              >
                Select{" "}
                {item.name === "General Delegate"
                  ? "Delegate Pass"
                  : `${item.name}${item.name === "VIP" ? " Pass" : ""}`}
                <ArrowUpRight />
              </button>
            </article>
          ))}
        </div>

        <p className="programme-note">
          Pass benefits are proposed and subject to confirmation. No payments
          are collected on this page.
        </p>
      </div>
    </section>
  );
}
