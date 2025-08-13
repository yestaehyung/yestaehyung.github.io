import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>연락처</h2>
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <p>email@example.com</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <p>010-1234-5678</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>서울특별시 OO구 OO로 123</p>
          </div>
        </div>
        
        <div className="social-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://scholar.google.com/citations?user=yourid" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-graduation-cap"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
