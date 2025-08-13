import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Taehyung Noh. All rights reserved.
      </p>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
    </footer>
  );
};

export default Footer;
