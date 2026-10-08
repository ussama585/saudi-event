import { Minus, Plus } from "lucide-react";
import { faqs } from "./data";

export default function FAQSection({ faq, setFaq }) {
  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-grid">
        <div>
          <p className="eyebrow">06 / GOOD TO KNOW</p>

          <h2>
            A few answers.
            <br />
            <span>Before you join us.</span>
          </h2>

          <p className="faq-copy">
            Everything you need to plan
            <br />
            your summit experience.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <button
                type="button"
                aria-expanded={faq === index}
                aria-controls={`answer-${index}`}
                onClick={() => setFaq(faq === index ? null : index)}
              >
                {question}
                {faq === index ? <Minus /> : <Plus />}
              </button>

              {faq === index && <p id={`answer-${index}`}>{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
