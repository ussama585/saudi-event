import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Riyadh Business Summit home">
      <span className="brand-symbol">
        <i />
        <i />
        <i />
        <i />
      </span>

      <span>
        RIYADH BUSINESS
        <span>
          SUMMIT <b>2026</b>
        </span>
      </span>
    </Link>
  );
}
