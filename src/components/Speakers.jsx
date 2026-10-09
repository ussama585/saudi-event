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
import speaker1 from "../assets/media/speakers/1-green.png";
import speaker2 from "../assets/media/speakers/2-green.png";
import speaker3 from "../assets/media/speakers/3-green.png";
import speaker4 from "../assets/media/speakers/4-green.png";
import speaker5 from "../assets/media/speakers/5-green.png";
import speaker6 from "../assets/media/speakers/6-green.png";
import speaker7 from "../assets/media/speakers/7-green.png";

const speakers = [
  {
    track: "GLOBAL BUSINESS",
    name: "Faisal Al Nasser",
    designation: "Chief Executive Officer",
    company: "Horizon Gate Group",
    icon: Globe2,
    image: speaker1,
  },
  {
    track: "INNOVATION",
    name: "Noura Al Harbi",
    designation: "Chief Innovation Officer",
    company: "Next Chapter Labs",
    icon: Lightbulb,
    image: speaker2,
  },
  {
    track: "INVESTMENT",
    name: "Omar Al Rashid",
    designation: "Managing Partner",
    company: "Crescent Bridge Capital",
    icon: Landmark,
    image: speaker3,
  },
  {
    track: "PARTNERSHIPS",
    name: "Khalid Al Mansour",
    designation: "Director of Strategic Partnerships",
    company: "Summit Link Ventures",
    icon: Handshake,
    image: speaker4,
  },
  {
    track: "LEADERSHIP",
    name: "Reem Al Qasimi",
    designation: "Chief Strategy Officer",
    company: "Future Path Advisory",
    icon: Globe2,
    image: speaker5,
  },
  {
    track: "ENTREPRENEURSHIP",
    name: "Sara Al Zahrani",
    designation: "Founder & CEO",
    company: "Ambition Works",
    icon: Lightbulb,
    image: speaker6,
  },
  {
    track: "TRANSFORMATION",
    name: "Abdullah Al Faris",
    designation: "Digital Transformation Director",
    company: "Vision Spark Technologies",
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
          Sample speaker profiles are shown below. Names, designations and
          companies are fictional; the confirmed line-up will be announced soon.
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
            {speakers.map(
              ({ track, name, designation, company, icon: Icon, image }) => (
                <SwiperSlide key={track}>
                  <article className="speaker-card">
                    <div className="speaker-portrait">
                      <Icon
                        className="speaker-track-icon"
                        size={110}
                        strokeWidth={0.65}
                      />
                      <UserRound size={130} strokeWidth={0.8} />
                      <img
                        src={image}
                        alt={`Sample portrait for ${name}`}
                        loading="lazy"
                        decoding="async"
                        width={1536}
                        height={1024}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="speaker-copy">
                      <p className="eyebrow">{track}</p>
                      <h3>{name}</h3>
                      <p className="speaker-designation">{designation}</p>
                      <p className="speaker-company">{company}</p>
                    </div>
                  </article>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
