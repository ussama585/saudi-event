import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skyline from '../../assets/media/riyadh-skyline.jpeg';
import district from '../../assets/media/riyadh-district.jpeg';

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: skyline,
    alt: 'Riyadh skyline at sunset with the illuminated Kingdom Centre',
    title: 'A skyline of possibility',
    caption: 'Discover the city hosting the summit.',
    width: 1920,
    height: 1024,
  },
  {
    src: district,
    alt: 'Modern towers and palm-lined walkways in Riyadh’s financial district',
    title: 'Where ambition takes shape',
    caption: 'A glimpse of Riyadh’s business district.',
    width: 1024,
    height: 1024,
  },
];

export default function GallerySection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        defaults: { duration: 0.7, ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      timeline
        .from('.section-heading', { opacity: 0, y: 24 })
        .from('.gallery-card', { opacity: 0, y: 36, stagger: 0.15 }, '-=0.35')
        .from('.gallery-note', { opacity: 0, y: 12, duration: 0.4 }, '-=0.2');
    }, sectionRef);

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="section gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE GALLERY</p>
            <h2 id="gallery-title">A glimpse of <span>Riyadh.</span></h2>
          </div>
          <p className="gallery-intro">
            Explore the skyline and surroundings of our host city.
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image) => (
            <figure className="gallery-card" key={image.src}>
              <div className="gallery-image">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <h3>{image.title}</h3>
                <p>{image.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="gallery-note">Illustrative city views. Summit photography will be shared after the event.</p>
      </div>
    </section>
  );
}
