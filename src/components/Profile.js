import React from "react";
import "../styles/Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-image">
        <img src={`${process.env.PUBLIC_URL}/profile.jpg`} alt="프로필 사진" />
      </div>
      <h1>Taehyeong Noh (노태형)</h1>
      <p className="position">Ph.D. Student @ Hanyang University</p>

      <div className="social-links">
        <a href="mailto:yestaehyung@hanyang.ac.kr" className="social-link">
          <i className="fas fa-envelope"></i> Email
        </a>
        <a
          href="https://scholar.google.com/citations?user=FwvW2AwAAAAJ&hl=en"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-graduation-cap"></i> Google Scholar
        </a>
        <a
          href="https://github.com/yestaehyung"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i> GitHub
        </a>
      </div>

      <div className="cv-link">
        <a
          href={`${process.env.PUBLIC_URL}/cv.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Curriculum Vitae (PDF)
        </a>
      </div>
    </div>
  );
};

export default Profile;
