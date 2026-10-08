import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function PortfolioLightbox({
  images,
  activeIndex,
  onNavigate,
  onClose,
}) {
  const dialogRef = useRef(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const image = isOpen ? images[activeIndex] : null;
  return createPortal(
    <dialog
      ref={dialogRef}
      className="portfolio-lightbox"
      aria-label="Portfolio image viewer"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          onNavigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      {image && (
        <>
          <div className="lightbox-header">
            <p aria-live="polite">
              Image {activeIndex + 1} of {images.length}
            </p>
            <button
              type="button"
              aria-label="Close image viewer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          <div className="lightbox-stage">
            <img src={image.src} alt={image.alt} />
          </div>
          <div className="lightbox-controls">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Previous image"
            >
              <ArrowLeft size={20} /> Previous
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Next image"
            >
              Next <ArrowRight size={20} />
            </button>
          </div>
        </>
      )}
    </dialog>,
    document.body,
  );
}
