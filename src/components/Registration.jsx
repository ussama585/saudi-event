import { useState } from "react";
import { ArrowLeft, CheckCircle2, ArrowUpRight } from "lucide-react";
import FormSelect from "./FormSelect";

export default function Registration() {
  const [prepared, setPrepared] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    interest: "Delegate",
  });
  const update = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <section
      id="registration"
      className="section-space registration-section"
      aria-labelledby="registration-title"
    >
      <div className="container registration-inner" data-reveal>
        <p className="eyebrow">YOUR NEXT CONNECTION STARTS HERE</p>
        <h2 id="registration-title">
          Express your <span>interest.</span>
        </h2>
        <p>
          Final booking details are coming soon. Prepare your enquiry below.
        </p>
        {prepared ? (
          <div className="registration-result" role="status">
            <CheckCircle2 size={36} />
            <h2>Your enquiry is ready.</h2>
            <p>
              Thanks, {values.name}. This preview has no submission service
              connected, so your details have not been sent or saved.
            </p>
            <button
              className="summit-button"
              type="button"
              onClick={() => setPrepared(false)}
            >
              Edit enquiry <ArrowLeft size={18} />
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setPrepared(true);
            }}
          >
            <div className="row g-4">
              {[
                ["name", "Full name", "text", "Enter your full name"],
                ["email", "Email address", "email", "you@company.com"],
                [
                  "company",
                  "Organisation",
                  "text",
                  "Enter your organisation name",
                ],
              ].map(([name, label, type, placeholder]) => (
                <div
                  className={name === "company" ? "col-12" : "col-md-6"}
                  key={name}
                >
                  <label className="form-label" htmlFor={name}>
                    {label}
                  </label>
                  <input
                    className="form-control"
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={values[name]}
                    onChange={update}
                    required
                    autoComplete={name === "company" ? "organization" : name}
                  />
                </div>
              ))}
              <div className="col-12">
                <label
                  className="form-label"
                  id="interest-label"
                  htmlFor="interest"
                >
                  I'm interested in
                </label>
                <FormSelect
                  id="interest"
                  name="interest"
                  value={values.interest}
                  options={["Delegate", "Partnership", "Corporate delegation"]}
                  onChange={(interest) =>
                    setValues((current) => ({ ...current, interest }))
                  }
                />
              </div>
            </div>
            <p className="small-note">
              Preview form. Details stay in this page and are not submitted to a
              server.
            </p>
            <button type="submit" className="summit-button">
              Prepare enquiry <ArrowUpRight size={20} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
