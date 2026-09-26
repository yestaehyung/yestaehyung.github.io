import React from "react";
import "../styles/Profile.css";
import icons from "./icons";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-image">
        <img src={`${process.env.PUBLIC_URL}/images/profile.jpg`} alt="Taehyung Noh" />
      </div>
      <h1>Taehyung Noh (노태형)</h1>
      <p className="position">Ph.D. Student @ Hanyang University</p>

      <div className="social-links">
        <a href="mailto:yestaehyung@hanyang.ac.kr" className="social-link">
          {icons.envelope} Email
        </a>
        <a
          href="https://scholar.google.com/citations?user=FwvW2AwAAAAJ&hl=en"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons.scholar} Google Scholar
        </a>
        <a
          href="https://github.com/yestaehyung"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons.github} GitHub
        </a>
        <a
          href={`${process.env.PUBLIC_URL}/CV_Taehyung/main.pdf`}
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons.pdf} Curriculum Vitae (PDF)
        </a>
      </div>
    </div>
  );
};

export default Profile;
