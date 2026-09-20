import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

export default function HeroSection() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const elems = document.querySelectorAll('.banner-elem');
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      elems.forEach((el, i) => {
        const depth = (i + 1) * 8;
        el.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <section className="banner-section" id="home">
        {/* Background grid overlay */}
        <div className="banner-grid-overlay"></div>

        {/* Floating shapes */}
        <div className="banner-float-shape bfs-1"></div>
        <div className="banner-float-shape bfs-2"></div>
        <div className="banner-float-shape bfs-3"></div>
        <div className="banner-float-shape bfs-4"></div>
        <div className="banner-float-shape bfs-5"></div>

        {/* Floating dots */}
        <div className="banner-elem be1"><div className="banner-elem-dot"></div></div>
        <div className="banner-elem be2"></div>
        <div className="banner-elem be3"></div>
        <div className="banner-elem be4"><div className="banner-elem-dot"></div></div>
        <div className="banner-elem be5"></div>
        <div className="banner-elem be6"></div>

        <div className="auto-container" style={{ width: '100%' }}>
          <div className="banner-inner">
            {/* Content */}
            <div className="banner-content">
              <div className="sub-badge">
                <span className="dot"></span>
                #1 AI Fashion Color Advisor
              </div>
              <h1>
                Discover Your<br />
                <span className="highlight">Perfect Color</span> Palette
              </h1>
              <p>
                Upload a photo or use your camera. Our AI analyzes your skin tone and
                undertone to craft a personalized fashion color guide — tailored just for you.
              </p>
              <div className="banner-buttons">
                <a href="#capture" className="theme-btn btn-style-one">Analyze My Style</a>
                <a href="#how-it-works" className="theme-btn btn-style-two">How It Works</a>
              </div>

              <div className="banner-stats">
                <div className="bs-item">
                  <div className="bs-num">9</div>
                  <div className="bs-label">Skin Types</div>
                </div>
                <div className="bs-item">
                  <div className="bs-num">8+</div>
                  <div className="bs-label">Color Recs</div>
                </div>
                <div className="bs-item">
                  <div className="bs-num">ML</div>
                  <div className="bs-label">Powered</div>
                </div>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="banner-visual" ref={bannerRef}>
              <div className="dashboard-mockup">
                {/* Float badges INSIDE mockup */}
                <div className="float-badge fb-2">
                  <div className="fb-icon green">✓</div>
                  <div className="fb-text">
                    <span className="fb-num">98%</span>
                    <span className="fb-label">Accuracy</span>
                  </div>
                </div>
                <div className="float-badge fb-1">
                  <div className="fb-icon blue">✦</div>
                  <div className="fb-text">
                    <span className="fb-num">5,000+</span>
                    <span className="fb-label">Analyses Done</span>
                  </div>
                </div>

                <div className="mockup-header">
                  <span className="mockup-dot md-red"></span>
                  <span className="mockup-dot md-yellow"></span>
                  <span className="mockup-dot md-green"></span>
                  <span className="mockup-title">AI Personal Advisor — Style Analysis</span>
                </div>

                <div className="mockup-stats">
                  <div className="ms-card">
                    <div className="ms-num">3</div>
                    <div className="ms-label">Skin Tones</div>
                  </div>
                  <div className="ms-card">
                    <div className="ms-num">3</div>
                    <div className="ms-label">Undertones</div>
                  </div>
                  <div className="ms-card">
                    <div className="ms-num">8+</div>
                    <div className="ms-label">Palettes</div>
                  </div>
                </div>

                <div className="mockup-bars">
                  <div className="mbar">
                    <span className="mbar-label">Fair Warm</span>
                    <div className="mbar-track"><div className="mbar-fill blue" style={{ width: '88%' }}></div></div>
                    <span className="mbar-pct">88%</span>
                  </div>
                  <div className="mbar">
                    <span className="mbar-label">Medium Cool</span>
                    <div className="mbar-track"><div className="mbar-fill green" style={{ width: '74%' }}></div></div>
                    <span className="mbar-pct">74%</span>
                  </div>
                  <div className="mbar">
                    <span className="mbar-label">Dark Neutral</span>
                    <div className="mbar-track"><div className="mbar-fill purple" style={{ width: '62%' }}></div></div>
                    <span className="mbar-pct">62%</span>
                  </div>
                  <div className="mbar">
                    <span className="mbar-label">Fair Cool</span>
                    <div className="mbar-track"><div className="mbar-fill pink" style={{ width: '91%' }}></div></div>
                    <span className="mbar-pct">91%</span>
                  </div>
                </div>

                <div className="mockup-chart">
                  <div className="mcbar"></div>
                  <div className="mcbar"></div>
                  <div className="mcbar"></div>
                  <div className="mcbar"></div>
                  <div className="mcbar"></div>
                  <div className="mcbar"></div>
                  <div className="mcbar"></div>
                  <div className="mcbar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <div className="stats-ticker">
        <div className="ticker-inner">
          <div className="ticker-track">
            {[
              { icon: '🎨', num: '9', label: 'Skin Classifications' },
              { icon: '✦', num: '8+', label: 'Color Recommendations' },
              { icon: '🤖', num: '98%', label: 'ML Accuracy' },
              { icon: '📸', num: '2', label: 'Input Methods' },
              { icon: '⚡', num: '<2s', label: 'Analysis Time' },
              { icon: '🎯', num: '100%', label: 'Personalized' },
              { icon: '🎨', num: '9', label: 'Skin Classifications' },
              { icon: '✦', num: '8+', label: 'Color Recommendations' },
              { icon: '🤖', num: '98%', label: 'ML Accuracy' },
              { icon: '📸', num: '2', label: 'Input Methods' },
              { icon: '⚡', num: '<2s', label: 'Analysis Time' },
              { icon: '🎯', num: '100%', label: 'Personalized' },
            ].map((item, i) => (
              <div className="ticker-item" key={i}>
                <span className="ticker-icon">{item.icon}</span>
                <span className="ticker-num">{item.num}</span>
                <span className="ticker-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
