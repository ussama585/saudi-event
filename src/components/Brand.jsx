import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Brand() {
  return (
    <Link
      className="summit-brand"
      to="/"
      aria-label="Riyadh Business Summit home"
    >
      <span className="brand-mark">
        <ArrowUpRight size={30} />
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
