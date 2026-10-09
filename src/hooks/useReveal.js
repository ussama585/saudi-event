import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useReveal(ref, dependency = null) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const mobile = window.matchMedia("(max-width: 575px)").matches;
        root.querySelectorAll("[data-reveal]").forEach((element) => {
          const owner = element.closest("[data-reveal-scope]");
          if (owner && owner !== ref.current) return;
          const direction = element.dataset.reveal;
          const siblings = [...element.parentElement.children].filter((child) =>
            child.hasAttribute("data-reveal"),
          );
          const distance = mobile ? 24 : 40;
          const horizontalOffset = () => {
            const bounds = element.getBoundingClientRect();
            const currentX = Number(gsap.getProperty(element, "x")) || 0;
            const available =
              direction === "left"
                ? bounds.left - currentX
                : document.documentElement.clientWidth -
                  (bounds.right - currentX);
            const offset = Math.min(distance, Math.max(0, available));
            return direction === "left" ? -offset : offset;
          };
          gsap.from(element, {
            opacity: 0,
            x:
              direction === "left" || direction === "right"
                ? horizontalOffset
                : 0,
            y: direction === "left" || direction === "right" ? 0 : distance,
            duration: 0.9,
            delay: Math.min(siblings.indexOf(element) * 0.1, 0.25),
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: element.closest(".summit-footer")
                ? "top bottom"
                : "top 90%",
              end: "bottom top",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          });
        });
      },
      ref,
    );
    let refreshFrame;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(refreshFrame);
      media.revert();
    };
  }, [ref, dependency]);
}
