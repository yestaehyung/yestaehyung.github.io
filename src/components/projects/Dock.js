import React from "react";
import { Link } from "react-router-dom";
import icons from "../icons";

const DOCK_ITEMS = [
  { label: "Home", icon: icons.home, to: "/", tone: "home" },
  {
    label: "CV",
    icon: icons.pdf,
    href: `${process.env.PUBLIC_URL}/CV_Taehyung/main.pdf`,
    tone: "cv",
  },
  {
    label: "Google Scholar",
    icon: icons.scholar,
    href: "https://scholar.google.com/citations?user=FwvW2AwAAAAJ&hl=en",
    tone: "scholar",
  },
  {
    label: "GitHub",
    icon: icons.github,
    href: "https://github.com/yestaehyung",
    tone: "github",
  },
  {
    label: "Email",
    icon: icons.envelope,
    href: "mailto:yestaehyung@hanyang.ac.kr",
    tone: "email",
  },
];

// macOS-style Dock with the site's main links. The name pops up above an
// icon on hover or keyboard focus, like the real Dock.
const DockItem = ({ item }) => {
  const content = (
    <>
      <span className="pd-dock-tile">{item.icon}</span>
      <span className="pd-dock-tip" aria-hidden="true">
        {item.label}
      </span>
    </>
  );
  const props = {
    className: `pd-dock-item pd-dock-${item.tone}`,
    "aria-label": item.label,
  };
  if (item.to) {
    return (
      <Link to={item.to} {...props}>
        {content}
      </Link>
    );
  }
  const external = item.href.startsWith("http") || item.href.endsWith(".pdf");
  return (
    <a
      href={item.href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
};

const Dock = () => (
  <nav className="pd-dock" aria-label="Dock">
    {DOCK_ITEMS.map((item) => (
      <DockItem key={item.label} item={item} />
    ))}
  </nav>
);

export default Dock;
