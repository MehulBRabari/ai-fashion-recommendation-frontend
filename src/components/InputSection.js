import React, { useEffect, useRef } from 'react';
import ImageUpload from './ImageUpload';
import WebcamCapture from './WebcamCapture';
import './InputSection.css';

const featureCards = [
  {
    icon: '🎨',
    title: 'Skin Tone Analysis',
    desc: 'Precisely detect Fair, Medium, or Dark skin tones using advanced computer vision.',
    overlay: 'Our ML model analyzes thousands of skin pixels to determine your accurate tone classification.'
  },
  {
    icon: '✨',
    title: 'Undertone Detection',
    desc: 'Identify Warm, Cool, or Neutral undertones hidden in your skin using color theory.',
    overlay: 'Undertone detection helps match colors that harmonize with your natural coloring for a radiant look.'
  },
  {
    icon: '👗',
    title: 'Color Recommendations',
    desc: 'Get 8+ personalized colors that make you look vibrant and put-together.',
    overlay: 'Each color recommendation comes with styling tips and reasons based on color theory principles.'
  },
  {
    icon: '📸',
    title: 'Photo or Camera',
    desc: 'Upload an existing photo or use your live webcam — flexible and convenient.',
    overlay: 'Real-time camera analysis or file upload accepted. Supports JPG, PNG, WebP up to 10MB.'
  }
];

const howItWorksSteps = [
  { num: '01', icon: '📸', title: 'Capture or Upload', desc: 'Take a clear photo or upload an existing one showing your face with natural lighting.' },
  { num: '02', icon: '🔍', title: 'Face Detection', desc: 'AI automatically detects your face and isolates skin regions for accurate analysis.' },
  { num: '03', icon: '🤖', title: 'ML Classification', desc: 'Machine learning model classifies your skin tone and undertone with high accuracy.' },
  { num: '04', icon: '🎨', title: 'Color Guide', desc: 'Receive your personalized fashion color palette with best colors and ones to avoid.' },
];

export default function InputSection({ activeTab, setActiveTab, onStart, onSuccess, onError, error, onDismissError }) {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <>
      {/* Feature Cards Section */}
      <section className="features-section-three" id="features">
        <div className="auto-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="sec-title reveal" ref={addRef}>
              <div className="title">Why AI FASHION ADVISOR</div>
              <h2>Powerful AI-Driven Features</h2>
              <div className="section-divider"></div>
              <p style={{ marginTop: '16px' }}>Everything you need to discover and perfect your personal color palette</p>
            </div>
          </div>

          <div className="feature-cards-row">
            {featureCards.map((card, i) => (
              <div className={`feature-block-four reveal delay-${i + 1}`} ref={addRef} key={i}>
                <div className="inner-box">
                  <div className="icon-box">{card.icon}</div>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>

                  <div className="overlay-content">
                    <div className="icon-box">{card.icon}</div>
                    <h4>{card.title}</h4>
                    <p>{card.overlay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload / Webcam Section */}
      <section className="features-section-four" id="capture">
        <div className="auto-container">
          <div className="section-inner-grid">
            {/* Left: Tab nav */}
            <div>
              <div className="sec-title reveal-left" ref={addRef}>
                <div className="title">Analyze Now</div>
                <h2>Upload or Use Camera</h2>
                <div className="section-divider"></div>
                <p>Choose how you'd like to submit your photo for AI analysis</p>
              </div>

              <div className="tab-btn-style-one reveal-left delay-2" ref={addRef}>
                <button
                  className={`tab-btn-item${activeTab === 'upload' ? ' active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  <h3>📁 Upload Photo</h3>
                  <p>Select a JPG, PNG, or WebP image from your device. Up to 10MB.</p>
                </button>
                <button
                  className={`tab-btn-item${activeTab === 'webcam' ? ' active' : ''}`}
                  onClick={() => setActiveTab('webcam')}
                >
                  <h3>📷 Live Camera</h3>
                  <p>Use your webcam for real-time face capture and analysis.</p>
                </button>
              </div>
            </div>

            {/* Right: Panel with error shown INSIDE */}
            <div className="reveal-right" ref={addRef}>
              <div className="tab-panel-content">
                {/* Error shown INSIDE the panel — above the upload UI */}
                {error && (
                  <div className="panel-error">
                    <div className="panel-error-icon">⚠</div>
                    <div className="panel-error-text">
                      <span className="panel-error-title">Analysis Failed</span>
                      <span className="panel-error-msg">{error}</span>
                    </div>
                    {onDismissError && (
                      <button className="panel-error-dismiss" onClick={onDismissError}>✕</button>
                    )}
                  </div>
                )}

                {activeTab === 'upload' ? (
                  <ImageUpload onStart={onStart} onSuccess={onSuccess} onError={onError} />
                ) : (
                  <WebcamCapture onStart={onStart} onSuccess={onSuccess} onError={onError} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="auto-container">
          <div style={{ textAlign: 'center' }}>
            <div className="sec-title reveal" ref={addRef}>
              <div className="title">Process</div>
              <h2>How AI FASHION ADVISOR Works</h2>
              <div className="section-divider"></div>
              <p style={{ marginTop: '16px' }}>Four simple steps to your personalized fashion color guide</p>
            </div>
          </div>

          <div className="hiw-steps-grid">
            {howItWorksSteps.map((step, i) => (
              <div className={`hiw-step-card reveal delay-${i + 1}`} ref={addRef} key={i}>
                <div className="hiw-step-num">{step.num}</div>
                <div className="hiw-step-icon">{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
