import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Introduction from './components/Introduction';
import FeaturedProjects from './components/FeaturedProjects';
import ResearchProjects from './components/ResearchProjects';
import Publications from './components/Publications';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <div className="main-content">
        <div className="left-column">
          <Profile />
        </div>
        <div className="right-column">
          <Introduction />
        </div>
      </div>
      <div className="full-width-section">
        <FeaturedProjects />
      </div>
      <div className="full-width-section">
        <Publications />
      </div>
    </>
  );
}

function ProjectsPage() {
  return (
    <div className="full-width-section">
      <ResearchProjects />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
      <Analytics />
    </Router>
  );
}

export default App;
