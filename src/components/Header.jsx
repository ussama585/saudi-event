import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Brand from "./Brand";
import { navigationLinks } from "../data/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const headerRef = useRef(null);
  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const headerHeight =
        headerRef.current?.querySelector(".header-row")
          ?.getBoundingClientRect().height || 0;
      const marker = headerHeight + 24;
      let current = null;

      for (const [, id] of navigationLinks) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }

      // The final section may be too short to reach the header.
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      ) {
        current = navigationLinks.at(-1)[1];
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    const main = document.querySelector("main");
    if (main) observer.observe(main);
    observer.observe(headerRef.current.querySelector(".header-row"));
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [location.pathname]);
  useLayoutEffect(() => {
    const header = headerRef.current;
    const row = header.querySelector(".header-row");
    const updateHeight = () => {
      const border = parseFloat(getComputedStyle(header).borderBottomWidth) || 0;
      document.documentElement.style.setProperty(
        "--header-height",
        `${row.getBoundingClientRect().height + border}px`,
      );
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(row);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    headerRef.current
      .querySelector("#mobile-menu a")
      ?.focus({ preventScroll: true });
    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const controls = [
        ...headerRef.current.querySelectorAll("a, button"),
      ].filter((element) => element.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", trapFocus);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`summit-header ${scrolled || open || location.pathname !== "/" ? "is-solid" : ""}${open ? " is-menu-open" : ""}`}
    >
      <div className="container header-row">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationLinks.map(([label, id]) => (
            <Link
              key={id}
              to={`/#${id}`}
              aria-current={location.pathname === "/" && activeSection === id ? "location" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          to="/#registration"
          className="summit-button button-small header-cta"
          onClick={() => setOpen(false)}
        >
          Register <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {navigationLinks.map(([label, id]) => (
            <Link
              key={id}
              to={`/#${id}`}
              aria-current={location.pathname === "/" && activeSection === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
