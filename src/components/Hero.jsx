import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Pause,
  Play,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skyline from "../assets/media/riyadh-skyline.jpeg";
import bannerVideo from "../assets/media/banner-video-optimized.mp4";
import Countdown from "./Countdown";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    let cancelled = false;
    video.muted = true;
    video.defaultMuted = true;
    if (reducedMotion || paused) video.pause();
    else
      video.play().catch((error) => {
        if (!cancelled && error.name !== "AbortError") setPaused(true);
      });
    return () => {
      cancelled = true;
    };
  }, [reducedMotion, paused]);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from("[data-hero]", {
          opacity: 0,
          y: 36,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
        });
        gsap.fromTo(
          ".hero-background",
          { scale: 1.08, yPercent: 0 },
          {
            scale: 1.14,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      },
      ref,
    );
    return () => media.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="main-content"
      className="summit-hero"
      aria-labelledby="hero-title"
    >
      <video
        ref={videoRef}
        className="hero-background"
        src={bannerVideo}
        poster={skyline}
        autoPlay={!reducedMotion && !paused}
        muted
        loop
        playsInline
        preload={reducedMotion ? "none" : "auto"}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="container hero-body">
        <p className="eyebrow" data-hero>
          <span className="live-dot" /> RIYADH BUSINESS SUMMIT · 2026 EDITION
        </p>
        <h1 id="hero-title" data-hero>
          Ambition.
          <br />
          Connection.
          <br />
          <span>What's next.</span>
        </h1>
        <div className="hero-bottom-row">
          <div>
            <p className="hero-description" data-hero>
              Where bold ideas meet the people
              <br className="d-none d-sm-block" /> who turn them into tomorrow.
            </p>
            <div className="hero-meta" data-hero>
              <span>
                <CalendarDays size={18} />
                15—17 October 2026
              </span>
              <span>
                <MapPin size={18} />
                Riyadh, Saudi Arabia
              </span>
            </div>
            <div className="hero-actions" data-hero>
              <Link className="summit-button" to="/#registration">
                Be part of it <ArrowUpRight size={20} />
              </Link>
              <a className="summit-button button-outline" href="#agenda">
                Programme <ArrowDown size={18} />
              </a>
            </div>
          </div>
          <div className="hero-edition" data-hero>
            <span>THREE DAYS.</span>
            <strong>
              One shared
              <br />
              tomorrow.
            </strong>
            <a href="#location" aria-label="View the summit location on the map">
              25.2517° N / 46.3864° E
            </a>
          </div>
        </div>
      </div>
      <Countdown />
      <div className="container hero-foot">
        <span>IDEAS THAT MOVE BUSINESS FORWARD</span>
        <div className="hero-foot-actions">
          {!reducedMotion && (
            <button
              className="hero-video-toggle"
              type="button"
              aria-label={
                paused ? "Play background video" : "Pause background video"
              }
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              {paused ? "Play video" : "Pause video"}
            </button>
          )}
          <a href="#countdown">
            Discover the summit <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
