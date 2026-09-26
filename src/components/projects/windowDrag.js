import { useCallback, useState } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Offset after dragging by `delta`, keeping the whole window inside `bounds`.
// `start.rect` is the window's on-screen rect when the drag began (it already
// includes `start.offset`).
export function clampOffset(start, delta, bounds) {
  const { rect, offset } = start;
  const dx = clamp(
    delta.x,
    bounds.left - rect.left,
    bounds.right - rect.width - rect.left,
  );
  const dy = clamp(
    delta.y,
    bounds.top - rect.top,
    bounds.bottom - rect.height - rect.top,
  );
  return { x: offset.x + dx, y: offset.y + dy };
}

// Drag a window by its title bar, macOS style. Returns the current offset (to
// apply as a transform) and the pointerdown handler for the title bar.
export function useWindowDrag(windowRef, enabled) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (e) => {
      const win = windowRef.current;
      if (!enabled || !win || e.button !== 0 || e.target.closest("button")) {
        return;
      }
      const bar = e.currentTarget;
      const start = { offset, rect: win.getBoundingClientRect() };
      const bounds = win.offsetParent.getBoundingClientRect();
      const origin = { x: e.clientX, y: e.clientY };

      const onMove = (ev) =>
        setOffset(
          clampOffset(
            start,
            { x: ev.clientX - origin.x, y: ev.clientY - origin.y },
            bounds,
          ),
        );
      const onUp = () => {
        bar.removeEventListener("pointermove", onMove);
        bar.removeEventListener("pointerup", onUp);
        bar.removeEventListener("pointercancel", onUp);
      };

      bar.setPointerCapture?.(e.pointerId);
      bar.addEventListener("pointermove", onMove);
      bar.addEventListener("pointerup", onUp);
      bar.addEventListener("pointercancel", onUp);
    },
    [enabled, offset, windowRef],
  );

  return { offset, onPointerDown };
}
