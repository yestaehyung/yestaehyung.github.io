import React, { useEffect, useState } from "react";

const CLOCK_TICK_MS = 30000;
const formatClock = (date) =>
  date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

// Decorative menu bar: the active window's name on the left, a live clock on
// the right. No Apple logo — this is an homage, not a copy.
const MenuBar = ({ activeTitle }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), CLOCK_TICK_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pd-menubar" aria-hidden="true">
      <span className="pd-menubar-app">Research</span>
      <span className="pd-menubar-item">{activeTitle || "Desktop"}</span>
      <span className="pd-menubar-clock">{formatClock(now)}</span>
    </div>
  );
};

export default MenuBar;
