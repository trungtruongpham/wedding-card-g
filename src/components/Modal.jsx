import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function Modal({ open, onClose, title, children, panelClassName = "" }) {
  const closeButtonRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    triggerRef.current = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = [...panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#26090c]/85 p-0 sm:items-center sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={panelRef}
        aria-modal="true"
        aria-labelledby={titleId}
        role="dialog"
        className={`relative max-h-[92dvh] w-full overflow-y-auto bg-ivory shadow-2xl sm:max-w-xl sm:rounded-2xl ${panelClassName}`}
      >
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 bg-burgundy px-5 py-3 text-parchment shadow-sm">
          <h2 id={titleId} className="font-invitation text-xl font-semibold uppercase tracking-[0.08em]">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-parchment transition-colors duration-200 hover:bg-white/12 active:bg-white/20"
            aria-label="Đóng cửa sổ"
          >
            <CloseIcon />
          </button>
        </header>
        {children}
      </section>
    </div>,
    document.body,
  );
}
