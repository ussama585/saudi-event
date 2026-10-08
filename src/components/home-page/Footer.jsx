import { ChevronRight } from "lucide-react";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <Brand />

          <p>
            A Platform for a Stronger
            <br />
            Business Tomorrow.
          </p>

          <div>
            <span className="footer-label">LET’S CONNECT</span>
            <p>Official contact details coming soon</p>

            <a href="#faq">
              Registration & event enquiries <ChevronRight />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Riyadh Business Summit. All rights reserved.</span>
          <span>15 – 17 OCTOBER · RIYADH, SAUDI ARABIA</span>
          <a href="#">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
