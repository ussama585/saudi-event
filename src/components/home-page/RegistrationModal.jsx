import { ArrowRight, CheckCircle2 } from "lucide-react";
import Modal from "./Modal";
import { passes } from "./data";

export default function RegistrationModal({
  register,
  setRegister,
  complete,
  pass,
  setPass,
  submit,
}) {
  return (
    <Modal
      open={register}
      onClose={() => setRegister(false)}
      title={
        complete
          ? "Your pass selection is ready"
          : "Your place at the summit"
      }
      description={
        complete
          ? "This is a registration preview, not a confirmed booking."
          : "15–17 October 2026 · Riyadh, Saudi Arabia"
      }
      className="registration-modal"
    >
      {complete ? (
        <div className="registration-success">
          <CheckCircle2 />
          <h3>{pass}</h3>

          <p>
            No information has been sent or saved, and no payment has been
            taken. Official registration will be available when event details
            are confirmed.
          </p>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setRegister(false)}
          >
            Back to the summit <ArrowRight />
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p className="form-notice">
            Registration preview · No booking or payment will be made.
          </p>

          <label>
            Choose your pass

            <select
              value={pass}
              onChange={(event) => setPass(event.target.value)}
            >
              {passes.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label>
              First name

              <input
                required
                name="firstName"
                autoComplete="given-name"
                placeholder="First name"
              />
            </label>

            <label>
              Last name

              <input
                required
                name="lastName"
                autoComplete="family-name"
                placeholder="Last name"
              />
            </label>
          </div>

          <label>
            Work email

            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>

          <label>
            Company

            <input
              required
              name="company"
              autoComplete="organization"
              placeholder="Company name"
            />
          </label>

          <label className="consent">
            <input type="checkbox" required />
            I understand this is a preview and does not reserve a pass.
          </label>

          <button type="submit" className="btn-primary">
            Preview registration <ArrowRight />
          </button>
        </form>
      )}
    </Modal>
  );
}
