import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function FormSelect({ id, name, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(options.indexOf(value));
  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const choose = (index) => {
    onChange(options[index]);
    setActive(index);
    setOpen(false);
    buttonRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      setActive((index) => {
        if (event.key === "Home") return 0;
        if (event.key === "End") return options.length - 1;
        if (!open) return options.indexOf(value);
        return (
          (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
          options.length
        );
      });
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else {
        setActive(options.indexOf(value));
        setOpen(true);
      }
    } else if (event.key.length === 1) {
      const index = options.findIndex((option) =>
        option.toLowerCase().startsWith(event.key.toLowerCase()),
      );
      if (index >= 0) {
        setActive(index);
        setOpen(true);
      }
    }
  };

  return (
    <div
      className="summit-select"
      ref={rootRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <input type="hidden" name={name} value={value} />
      <button
        ref={buttonRef}
        id={id}
        type="button"
        className="summit-select-trigger"
        role="combobox"
        aria-labelledby={`${id}-label`}
        aria-expanded={open}
        aria-controls={`${id}-options`}
        aria-haspopup="listbox"
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onKeyDown={handleKeyDown}
        onClick={() => {
          setActive(options.indexOf(value));
          setOpen(!open);
        }}
      >
        <span>{value}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && (
        <ul
          id={`${id}-options`}
          className="summit-select-options"
          role="listbox"
          aria-labelledby={`${id}-label`}
        >
          {options.map((option, index) => (
            <li
              key={option}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option === value}
              className={index === active ? "is-active" : ""}
              onPointerMove={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option}</span>
              {option === value && <Check size={18} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
