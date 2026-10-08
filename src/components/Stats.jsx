import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const stats = [
  { value: 3, label: "Days of possibility" },
  { value: 12, label: "Proposed sessions" },
  { value: 3, label: "Strategic pillars" },
  { value: 1, label: "Shared ambition" },
];

export default function Stats() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const section = ref.current;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        section.querySelectorAll("[data-count]").forEach((element) => {
          const value = { count: 0 };
          gsap.to(value, {
            count: Number(element.dataset.count),
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              element.textContent = Math.round(value.count).toLocaleString(
                "en",
              );
            },
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          });
        });
        return () => {
          section.querySelectorAll("[data-count]").forEach((element) => {
            element.textContent = element.dataset.count;
          });
        };
      },
      ref,
    );
    return () => media.revert();
  }, []);
  return (
    <section
      className="stats-section"
      ref={ref}
      aria-label="Summit at a glance"
    >
      <div className="container">
        <div className="row g-0">
          {stats.map((stat) => (
            <div
              className="col-6 col-lg-3 stat-item"
              key={stat.label}
              data-reveal
            >
              <strong>
                <span data-count={stat.value}>{stat.value}</span>
                <span className="stat-accent">/</span>
              </strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
