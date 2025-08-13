import React from 'react';
import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Introduction from './components/Introduction';
import News from './components/News';
import ResearchProjects from './components/ResearchProjects';
import Publications from './components/Publications';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="main-content">
          <div className="left-column">
            <Profile />
          </div>
          <div className="right-column">
            <Introduction />
            <News />
            <ResearchProjects />
            <Publications />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
