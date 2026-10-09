import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import PortfolioLightbox from "./PortfolioLightbox";

const imageFiles = import.meta.glob(
  "../assets/media/portfolio/*.{webp,jpg,jpeg,png,avif}",
  { eager: true, query: "?url", import: "default" },
);
const featuredFiles = ["s-13.webp", "t-3.webp", "s-2.jpg"];
const images = Object.entries(imageFiles)
  .sort(([a], [b]) => {
    const featuredA = featuredFiles.indexOf(a.split("/").pop());
    const featuredB = featuredFiles.indexOf(b.split("/").pop());
    if (featuredA !== -1 || featuredB !== -1) {
      return (
        (featuredA === -1 ? featuredFiles.length : featuredA) -
        (featuredB === -1 ? featuredFiles.length : featuredB)
      );
    }
    return a.localeCompare(b, undefined, { numeric: true });
  })
  .map(([path, src], index) => ({
    id: path,
    src,
    alt: `Portfolio image ${index + 1}`,
  }));
const batchSize = 12;

export default function Portfolio() {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [columns, setColumns] = useState(4);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 992px)");
    const tablet = window.matchMedia("(min-width: 576px)");
    const update = () =>
      setColumns(desktop.matches ? 4 : tablet.matches ? 2 : 1);
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  const visibleImages = images.slice(0, visibleCount);
  const remaining = images.length - visibleImages.length;

  return (
    <section
      id="portfolio"
      className="section-space portfolio-section"
      aria-labelledby="portfolio-title"
    >
      <div className="container-fluid portfolio-container">
        <div className="section-heading portfolio-heading" data-reveal>
          <div>
            <p className="eyebrow">HIGHLIGHTS FROM LAST YEAR</p>
            <h2 id="portfolio-title">
              Experiences worth <span>remembering.</span>
            </h2>
          </div>
          <p>A collection of moments, ideas and connections brought to life.</p>
        </div>
        <div className="portfolio-grid" data-reveal>
          {Array.from({ length: columns }, (_, column) => (
            <div className="portfolio-column" key={column}>
              {visibleImages
                .filter((_, index) => index % columns === column)
                .map(({ id, src, alt }) => (
                  <figure className="portfolio-item" key={id}>
                    <button
                      type="button"
                      className="portfolio-image-button"
                      aria-label={`View ${alt.toLowerCase()}`}
                      aria-haspopup="dialog"
                      onClick={() =>
                        setActiveIndex(
                          images.findIndex((image) => image.id === id),
                        )
                      }
                    >
                      <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  </figure>
                ))}
            </div>
          ))}
        </div>
        <div className="portfolio-actions">
          <p className="small-note" role="status" aria-live="polite">
            Showing {visibleImages.length} of {images.length} images
          </p>
          {remaining > 0 && (
            <button
              className="summit-button"
              type="button"
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + batchSize, images.length),
                )
              }
            >
              Load more <Plus size={20} />
            </button>
          )}
        </div>
      </div>
      <PortfolioLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(direction) =>
          setActiveIndex((index) =>
            index === null
              ? null
              : (index + direction + images.length) % images.length,
          )
        }
      />
    </section>
  );
}
