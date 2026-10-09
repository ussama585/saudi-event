import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Keyboard, Autoplay } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Globe2,
  Lightbulb,
  Landmark,
  Handshake,
  Pause,
  Play,
} from "lucide-react";
import speaker1 from "../assets/media/speakers/1.jpeg";
import speaker2 from "../assets/media/speakers/2.jpeg";
import speaker3 from "../assets/media/speakers/3.jpeg";
import speaker4 from "../assets/media/speakers/4.jpeg";
import speaker5 from "../assets/media/speakers/5.jpeg";
import speaker6 from "../assets/media/speakers/6.jpeg";
import speaker7 from "../assets/media/speakers/7.jpeg";

const speakers = [
  {
    track: "GLOBAL BUSINESS",
    role: "The leaders opening new horizons",
    icon: Globe2,
    image: speaker1,
  },
  {
    track: "INNOVATION",
    role: "The thinkers shaping what comes next",
    icon: Lightbulb,
    image: speaker2,
  },
  {
    track: "INVESTMENT",
    role: "The voices building lasting value",
    icon: Landmark,
    image: speaker3,
  },
  {
    track: "PARTNERSHIPS",
    role: "The connectors bringing ambition together",
    icon: Handshake,
    image: speaker4,
  },
  {
    track: "LEADERSHIP",
    role: "The perspectives inspiring a shared future",
    icon: Globe2,
    image: speaker5,
  },
  {
    track: "ENTREPRENEURSHIP",
    role: "The founders turning ambition into action",
    icon: Lightbulb,
    image: speaker6,
  },
  {
    track: "TRANSFORMATION",
    role: "The ideas moving business forward",
    icon: Landmark,
    image: speaker7,
  },
];

export default function Speakers() {
  const swiperRef = useRef(null);
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
    if (reducedMotion || paused) swiperRef.current?.autoplay.stop();
    else swiperRef.current?.autoplay.start();
  }, [reducedMotion, paused]);
  return (
    <section id="speakers" className="section-space speakers-section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">03 / THE SPEAKERS</p>
            <h2>
              Fresh perspectives.
              <br />
              <span>Meaningful dialogue.</span>
            </h2>
          </div>
          <div className="slider-controls">
            {!reducedMotion && (
              <button
                type="button"
                aria-label={
                  paused ? "Play speaker slider" : "Pause speaker slider"
                }
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={20} /> : <Pause size={20} />}
              </button>
            )}
            <button
              type="button"
              aria-label="Previous speaker track"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              aria-label="Next speaker track"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        <p className="speaker-announcement" data-reveal>
          Our speaker line-up is taking shape. Confirmed names and biographies
          will be announced here.
        </p>
        <div data-reveal>
          <Swiper
            modules={[A11y, Pagination, Keyboard, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1.15}
            spaceBetween={24}
            speed={700}
            rewind
            autoplay={{
              enabled: !reducedMotion && !paused,
              delay: 3500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {speakers.map(({ track, role, icon: Icon, image }, index) => (
              <SwiperSlide key={track}>
                <article className={`speaker-card speaker-tone-${index}`}>
                  <div className="speaker-portrait">
                    <Icon
                      className="speaker-track-icon"
                      size={110}
                      strokeWidth={0.65}
                    />
                    <UserRound size={130} strokeWidth={0.8} />
                    <img
                      src={image}
                      alt={`Speaker portrait ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      width={300}
                      height={300}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="speaker-copy">
                    <p className="eyebrow">{track}</p>
                    <h3>{role}</h3>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
