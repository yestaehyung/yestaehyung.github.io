import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToPublications = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("publications");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById("publications");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Taehyung Noh</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                About Me
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={location.pathname === "/projects" ? "active" : ""}
              >
                Projects
              </Link>
            </li>
            <li>
              <a href="#publications" onClick={scrollToPublications}>
                Publications
              </a>
            </li>
            <li>
              <Link
                to="/blog"
                className={location.pathname.startsWith("/blog") ? "active" : ""}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
