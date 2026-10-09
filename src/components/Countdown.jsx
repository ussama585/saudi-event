import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const opening = new Date("2026-10-15T09:00:00+03:00").getTime();
function remaining() {
  const seconds = Math.max(0, Math.floor((opening - Date.now()) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
}

export default function Countdown() {
  const [time, setTime] = useState(remaining);
  const seconds = time[3];
  const ref = useRef(null);
  useEffect(() => {
    const timer = setInterval(() => setTime(remaining()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".countdown-unit--seconds .countdown-number",
        { y: 5, opacity: 0.7 },
        { y: 0, opacity: 1, duration: 0.3 },
      );
    }, ref);
    return () => context.revert();
  }, [seconds]);
  return (
    <section id="countdown" className="countdown-section" ref={ref}>
      <div className="container countdown-row" data-reveal>
        <div>
          <p className="eyebrow">THE NEXT CHAPTER BEGINS IN</p>
          <h2>
            {time.some((value) => value > 0)
              ? "Make every moment count."
              : "The countdown is complete."}
          </h2>
        </div>
        <div
          className="countdown-clock"
          role="timer"
          aria-label="Time until the summit opens"
        >
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
            <div
              className={`countdown-unit${label === "Seconds" ? " countdown-unit--seconds" : ""}`}
              key={label}
            >
              <span className="countdown-number">
                {String(time[index]).padStart(2, "0")}
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
