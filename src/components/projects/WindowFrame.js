import React, { useEffect, useRef, useState } from "react";
import { useWindowDrag } from "./windowDrag";

// Phones show windows as fixed full-width sheets, so dragging is off there.
const DRAG_QUERY = "(min-width: 601px)";
const canDrag = () =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(DRAG_QUERY).matches
    : false;

// macOS-style window chrome shared by the Finder and project windows.
// - Focus moves into the window on open and back to its opener on close.
// - Dragging the title bar moves it; the green light or a title-bar
//   double-click maximizes it to the desktop and back.
// - Pressing anywhere in it brings it to the front (`onActivate`).
const WindowFrame = ({
  title,
  className = "",
  isFront,
  onActivate,
  onClose,
  children,
}) => {
  const windowRef = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const { offset, onPointerDown } = useWindowDrag(
    windowRef,
    canDrag() && !maximized,
  );
  const titleId = `window-title-${title.replace(/\W+/g, "-").toLowerCase()}`;
  const toggleMaximized = () => setMaximized((m) => !m);

  useEffect(() => {
    const opener = document.activeElement;
    // Focus the window itself (not the close light) so no ring flashes on
    // open; keyboard users Tab straight to the close button from here.
    windowRef.current?.focus();
    return () => {
      if (opener && document.contains(opener)) opener.focus();
    };
  }, []);

  const moved = !maximized && (offset.x || offset.y);

  return (
    <div
      ref={windowRef}
      tabIndex={-1}
      className={`pd-window ${className} ${isFront ? "is-front" : ""} ${
        maximized ? "is-maximized" : ""
      }`}
      style={
        moved
          ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
          : undefined
      }
      role="dialog"
      aria-labelledby={titleId}
      onPointerDown={onActivate}
    >
      <div
        className="pd-titlebar"
        onPointerDown={onPointerDown}
        onDoubleClick={(e) => {
          if (!e.target.closest("button")) toggleMaximized();
        }}
      >
        <div className="pd-traffic">
          <button
            type="button"
            className="pd-light pd-light-close"
            aria-label={`Close ${title}`}
            onClick={onClose}
          />
          <span className="pd-light pd-light-min" aria-hidden="true" />
          <button
            type="button"
            className="pd-light pd-light-max"
            aria-label={`${maximized ? "Restore" : "Maximize"} ${title}`}
            aria-pressed={maximized}
            onClick={toggleMaximized}
          />
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
