import { useLayoutEffect, useRef } from "react";
import L from "leaflet";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destination = [25.2515625, 46.3869375];
const saudiBounds = L.latLngBounds([16.3, 34.5], [32.3, 55.7]);

export default function ScrollMap() {
  const mapRef = useRef(null);

  useLayoutEffect(() => {
    const element = mapRef.current;
    const map = L.map(element, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      zoomSnap: 0,
      zoomAnimation: true,
      fadeAnimation: false,
      attributionControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      keepBuffer: 4,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    L.marker(destination, {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({
        className: "location-marker",
        html: '<span class="location-marker-dot"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    })
      .addTo(map)
      .bindTooltip("Riyadh Exhibition & Convention Center", {
        permanent: true,
        direction: "top",
        offset: [0, -18],
        className: "location-marker-label",
      });

    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions.reduced) {
          map.setView(destination, 14, { animate: false });
          return;
        }
        map.fitBounds(saudiBounds, { padding: [20, 20], animate: false });
        ScrollTrigger.create({
          trigger: element,
          start: "center 70%",
          once: true,
          onEnter: () => {
            map.invalidateSize({ pan: false });
            map.flyTo(destination, 14, {
              duration: 2.2,
              easeLinearity: 0.25,
            });
          },
        });
        return () => map.stop();
      },
    );
    let frame;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        map.invalidateSize({ pan: false });
        ScrollTrigger.refresh();
      });
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.revert();
      map.remove();
    };
  }, []);

  return (
    <div className="location-map-view">
      <div
        ref={mapRef}
        className="location-map-canvas"
        role="img"
        aria-label="Map of Saudi Arabia that automatically zooms to Riyadh Exhibition and Convention Center in Malham when it comes into view."
      />
      <span className="location-map-hint">
        RIYADH EXHIBITION &amp; CONVENTION CENTER
      </span>
    </div>
  );
}
