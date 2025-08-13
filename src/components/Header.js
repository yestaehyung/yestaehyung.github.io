import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Taehyeong Noh</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Research</a></li>
            <li><a href="#">Publications</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
