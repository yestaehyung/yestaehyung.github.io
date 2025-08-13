import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>소개</h2>
        <div className="about-content">
          <div className="profile-image">
            <img src="/profile.jpg" alt="프로필 사진" />
          </div>
          <div className="profile-text">
            <h3>인공지능대학원 박사과정</h3>
            <p>
              안녕하세요! 저는 인공지능대학원에서 박사과정을 밟고 있는 홍길동입니다.
              저의 연구 관심사는 딥러닝, 자연어 처리, 컴퓨터 비전 등이며,
              특히 [구체적인 연구 분야]에 중점을 두고 있습니다.
            </p>
            <div className="education">
              <h4>학력</h4>
              <ul>
                <li>인공지능대학원 박사과정 (2023-현재)</li>
                <li>OO대학교 컴퓨터공학과 석사 (2021-2023)</li>
                <li>OO대학교 컴퓨터공학과 학사 (2017-2021)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
