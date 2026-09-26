import React, { useEffect, useRef } from "react";
import { useWindowDrag } from "./windowDrag";

// Phones show windows as fixed full-width sheets, so dragging is off there.
const DRAG_QUERY = "(min-width: 601px)";
const canDrag = () =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(DRAG_QUERY).matches
    : false;

// macOS-style window chrome shared by the Finder and project windows. Focus
// moves into the window when it opens and returns to whatever opened it when
// it closes, so keyboard users never lose their place.
const WindowFrame = ({ title, className = "", onClose, children }) => {
  const windowRef = useRef(null);
  const { offset, onPointerDown } = useWindowDrag(windowRef, canDrag());
  const titleId = `window-title-${title.replace(/\W+/g, "-").toLowerCase()}`;

  useEffect(() => {
    const opener = document.activeElement;
    // Focus the window itself (not the close light) so no ring flashes on
    // open; keyboard users Tab straight to the close button from here.
    windowRef.current?.focus();
    return () => {
      if (opener && document.contains(opener)) opener.focus();
    };
  }, []);

  return (
    <div
      ref={windowRef}
      tabIndex={-1}
      className={`pd-window ${className}`}
      style={
        offset.x || offset.y
          ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
          : undefined
      }
      role="dialog"
      aria-labelledby={titleId}
    >
      <div className="pd-titlebar" onPointerDown={onPointerDown}>
        <div className="pd-traffic">
          <button
            type="button"
            className="pd-light pd-light-close"
            aria-label={`Close ${title}`}
            onClick={onClose}
          />
          <span className="pd-light pd-light-min" aria-hidden="true" />
          <span className="pd-light pd-light-max" aria-hidden="true" />
        </div>
        <h3 id={titleId} className="pd-window-title">
          {title}
        </h3>
      </div>
      <div className="pd-window-body">{children}</div>
    </div>
  );
};

export default WindowFrame;
