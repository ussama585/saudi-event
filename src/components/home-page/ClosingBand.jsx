import { ArrowUpRight } from "lucide-react";

export default function ClosingBand({ openRegister }) {
  return (
    <section className="closing-band">
      <div className="container">
        <div>
          <p className="eyebrow">THE NEXT CHAPTER STARTS HERE</p>

          <h2>
            Be in the room.
            <br />
            Be part of tomorrow.
          </h2>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => openRegister()}
        >
          Register Now <ArrowUpRight />
        </button>
      </div>
    </section>
  );
}
