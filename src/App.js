import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Introduction from './components/Introduction';
import ProjectsDesktop from './components/projects/ProjectsDesktop';
import Publications from './components/Publications';
import ResearchGraph from './components/ResearchGraph';
import publicationsData from './data/publicationsData';
import researchTopics from './data/researchTopics';
import Footer from './components/Footer';

function HomePage() {
  const [focusRequest, setFocusRequest] = useState(null);
  // A fresh object per click, so selecting the same paper twice re-triggers.
  const focusPublication = (id) => setFocusRequest({ id });

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
        <ResearchGraph
          publications={publicationsData}
          topics={researchTopics}
          onSelectPaper={focusPublication}
        />
      </div>
      <div className="full-width-section">
        <Publications focusRequest={focusRequest} />
      </div>
    </>
  );
}

function ProjectsPage() {
  return (
    <div className="full-width-section">
      <ProjectsDesktop />
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
