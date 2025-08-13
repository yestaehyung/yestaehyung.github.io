import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Taehyung Noh</h1>
        <nav>
          <ul>
            <li>
              <a href="#about-me">About Me</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#publications">Publications</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
