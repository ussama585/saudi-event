import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const questions = [
  [
    "When and where is the summit?",
    "The summit is planned for 15–17 October 2026 in Riyadh, Saudi Arabia. The confirmed venue will be announced here.",
  ],
  [
    "Who is the summit for?",
    "Business leaders, entrepreneurs, investors and professionals looking for fresh perspectives and meaningful connections.",
  ],
  [
    "How can I register?",
    "Use the Register button to express your interest. Final ticket pricing and booking details will be shared when registration opens.",
  ],
  [
    "Are the speakers and programme confirmed?",
    "The programme is a proposed outline. Confirmed speakers and session details will be published before the event.",
  ],
  [
    "Can my organisation become a partner?",
    "Select partnership interest in the registration section below to prepare a partnership enquiry.",
  ],
];

export default function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section id="faq" className="section-space faq-section">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4" data-reveal>
            <p className="eyebrow">06 / GOOD TO KNOW</p>
            <h2>
              Your questions.
              <br />
              <span>Answered.</span>
            </h2>
            <p className="faq-intro">
              A little clarity before
              <br />
              the next big conversation.
            </p>
          </div>
          <div className="col-lg-8" data-reveal>
            {questions.map(([question, answer], index) => (
              <div
                className={`faq-item ${active === index ? "is-open" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-expanded={active === index}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setActive(active === index ? null : index)}
                  >
                    <span>{question}</span>
                    {active === index ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  hidden={active !== index}
                >
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
