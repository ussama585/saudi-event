import Brand from "./Brand";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { navigationLinks } from "../data/navigation";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="summit-footer">
      <div className="container">
        <div className="footer-top" data-reveal>
          <div>
            <Brand />
            <p>
              A platform for a stronger
              <br />
              business tomorrow.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {navigationLinks.map(([label, id]) => (
              <Link to={`/#${id}`} key={id}>
                {label}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </nav>
          <div className="footer-location">
            <span>SEE YOU IN RIYADH.</span>
            <strong>
              15—17 OCT
              <br />
              2026
            </strong>
          </div>
        </div>
        <div className="footer-bottom" data-reveal>
          <span>© {currentYear} Riyadh Business Summit</span>
          <span>Built around ambition. Made for connection.</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
