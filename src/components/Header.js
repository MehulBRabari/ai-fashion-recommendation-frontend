import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`main-header${scrolled ? ' scrolled' : ''}`}>
      <div className="auto-container">
        <div className="header-outer">
          <div className="logo-box">
            <div className="logo">
              <div className="logo-icon">AF</div>
              <span className="logo-text">AI FASHION ADVISOR</span>
            </div>
          </div>

          <div className="nav-outer">
            <nav className="main-menu">
              <div className="navbar-header">
                <button
                  className="navbar-toggler"
                  onClick={() => setNavOpen(!navOpen)}
                  aria-label="Toggle navigation"
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div
                className={`navbar-collapse${navOpen ? ' open' : ''}`}
                id="navbarSupportedContent"
              >
                <ul className="navigation">
                  <li className="current"><a href="#home">Home</a></li>
                  <li><a href="#capture">Analyze</a></li>
                  <li><a href="#how-it-works">How It Works</a></li>
                  <li><a href="#features">Features</a></li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="outer-box">
            <span className="sign-in-btn">AI Fashion Advisor</span>
            <a href="#capture" className="theme-btn btn-style-one" style={{ padding: '10px 24px', fontSize: '13px' }}>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
