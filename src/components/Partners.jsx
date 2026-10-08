import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Handshake, Pause, Play, ArrowLeft, ArrowRight } from "lucide-react";

const logoFiles = import.meta.glob(
  "../assets/media/partners/*.{svg,png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);
const partnerNames = {
  stc: "STC",
  rotana: "Rotana",
  redsea: "Red Sea",
  pcg: "PCG",
  nitx: "NITX",
  mbc: "MBC",
  manga: "Manga",
  jaco: "Jaco",
  ideation: "Ideation",
  humain: "HUMAIN",
  expo: "Expo",
  elixr: "Elixr",
  cargo: "Cargo",
  arabsat: "Arabsat",
  alula: "AlUla",
  "al-arabia": "Al Arabia",
};
const partners = Object.entries(logoFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, logo]) => {
    const name = path
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "");
    return { logo, name: partnerNames[name] || "Partner logo", id: name };
  });

export default function Partners() {
  const swiperRef = useRef(null);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || paused) swiperRef.current?.autoplay.stop();
    else swiperRef.current?.autoplay.start();
  }, [reduced, paused]);

  return (
    <section id="partners" className="section-space partners-section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">05 / PARTNERSHIPS</p>
            <h2>
              Our partners.
              <br />
              <span>Shared ambition. Greater impact.</span>
            </h2>
          </div>
          <p className="text-link">
            Partner with the summit <Handshake size={20} />
          </p>
        </div>
        <div className="partner-slider" data-reveal>
          <div className="slider-controls partner-controls">
            {!reduced && (
              <button
                type="button"
                aria-label={
                  paused ? "Play partner slider" : "Pause partner slider"
                }
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={20} /> : <Pause size={20} />}
              </button>
            )}
            <button
              type="button"
              aria-label="Previous partners"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              aria-label="Next partners"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowRight />
            </button>
          </div>
          <Swiper
            modules={[A11y, Autoplay, Keyboard]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1.5}
            spaceBetween={16}
            speed={700}
            rewind
            autoplay={{
              enabled: !reduced && !paused,
              delay: 2500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            breakpoints={{
              576: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
            }}
          >
            {partners.map(({ logo, name, id }) => (
              <SwiperSlide key={id}>
                <div className="partner-slot">
                  <img
                    src={logo}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    width={280}
                    height={180}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
