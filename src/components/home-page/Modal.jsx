import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className = "",
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className={`summit-modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="modal-title">{title}</h2>

        {description && (
          <p className="modal-description">{description}</p>
        )}

        {children}
      </div>
    </div>
  );
}
