import React, { lazy, Suspense, useState, useEffect } from "react";
import "../styles/ThreeBackground.css";

const ConstellationField = lazy(() =>
  import("@designcodeio/threeui/components/ConstellationField").then((m) => ({
    default: m.ConstellationField,
  }))
);

const STORAGE_KEY = "three-mode";

const ThreeBackground = () => {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {}
  }, [enabled]);

  return (
    <>
      <button
        className="three-toggle"
        onClick={() => setEnabled((prev) => !prev)}
        aria-label={enabled ? "Disable 3D background" : "Enable 3D background"}
        title={enabled ? "Switch to 2D" : "Switch to 3D"}
      >
        {enabled ? "3D" : "2D"}
      </button>

      {enabled && (
        <div className="three-background">
          <Suspense fallback={null}>
            <ConstellationField />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default ThreeBackground;
