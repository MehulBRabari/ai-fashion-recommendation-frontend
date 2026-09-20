import React, { useEffect, useRef } from 'react';
import ColorPalette from './ColorPalette';
import OutfitGenerator from './OutfitGenerator';
import './ResultsSection.css';

const TONE_DESCRIPTIONS = {
  Fair:   'Light skin with delicate, luminous quality',
  Medium: 'Warm, sun-kissed skin with natural depth',
  Dark:   'Rich, deeply beautiful, commanding skin'
};
const UNDERTONE_DESCRIPTIONS = {
  Warm:    'Golden, peachy, yellowish tones in your skin',
  Cool:    'Pink, rosy, bluish tones in your skin',
  Neutral: 'A balanced mix of warm and cool tones'
};
const UNDERTONE_ICONS = { Warm: '🌅', Cool: '❄️', Neutral: '⚖️' };
const tipIcons = ['🎨', '✨', '👗', '💡', '🌟', '🎯'];

export default function ResultsSection({ result, onAnalyzeAnother }) {
  const { skin_tone, undertone, skin_tone_confidence, avg_color_rgb, recommendations, human_validation, skin_sample_ratio, skin_pixel_count } = result;

  const skinHex = avg_color_rgb
    ? `#${avg_color_rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`
    : '#c8a882';

  const confidencePct = Math.round((skin_tone_confidence || 0.8) * 100);

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
    <div className="results-wrapper" id="results">

      {/* Banner */}
      <div className="results-banner">
        <div className="results-banner-inner">
          <div className="results-complete-badge">
            <span className="dot"></span>
            Analysis Complete
          </div>
          <h1>Your <span className="highlight">Style Profile</span></h1>
          <p>{recommendations.summary}</p>
        </div>
      </div>

      {/* Skin Profile */}
      <section className="profile-section">
        <div className="auto-container">
          <div className="sec-title reveal" ref={addRef} style={{ textAlign: 'center' }}>
            <div className="title">Skin Analysis</div>
            <h2>Your Skin Profile</h2>
            <div className="section-divider"></div>
          </div>

          <div className="profile-grid reveal" ref={addRef}>
            <div className="skin-swatch-card">
              <div className="skin-swatch-display" style={{ background: skinHex }} title={`Avg skin: ${skinHex}`} />
              <div className="skin-hex">{skinHex.toUpperCase()}</div>
              <div className="skin-note">Average skin tone color</div>
              <div className="skin-tone-label">{skin_tone}</div>
            </div>

            <div className="profile-info-card">
              <h3>Color Profile Details</h3>
              <div className="profile-items-row">
                <div className="profile-item">
                  <span className="profile-item-label">Skin Tone</span>
                  <span className="profile-item-value tone">{skin_tone}</span>
                  <span className="profile-item-desc">{TONE_DESCRIPTIONS[skin_tone]}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-item-label">Undertone</span>
                  <span className="profile-item-value undertone">{UNDERTONE_ICONS[undertone]} {undertone}</span>
                  <span className="profile-item-desc">{UNDERTONE_DESCRIPTIONS[undertone]}</span>
                </div>
              </div>
              <div className="confidence-row">
                <span className="confidence-label">AI Confidence</span>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{ width: `${confidencePct}%` }} />
                </div>
                <span className="confidence-pct">{confidencePct}%</span>
              </div>
              {human_validation && (
                <div className="human-validation-box">
                  <strong>Human-only check passed</strong>
                  <span>Face quality: {Math.round((human_validation.score || 0) * 100)}% · Skin sample: {Math.round((skin_sample_ratio || 0) * 100)}% · Pixels: {skin_pixel_count || 0}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Color Recommendations */}
      <section className="color-recs-section">
        <div className="auto-container">
          <div className="sec-title reveal" ref={addRef} style={{ textAlign: 'center' }}>
            <div className="title">Your Palette</div>
            <h2>Personalized Color Recommendations</h2>
            <div className="section-divider"></div>
            <p style={{ marginTop: '16px' }}>Colors curated specifically for your skin tone and undertone</p>
          </div>
          <div className="color-recs-grid reveal" ref={addRef}>
            <ColorPalette title="Best Colors to Wear" subtitle="These shades will make you glow ✨" colors={recommendations.best_colors} type="best" />
            <ColorPalette title="Colors to Avoid" subtitle="These may wash out or clash" colors={recommendations.avoid_colors} type="avoid" />
          </div>
        </div>
      </section>

      {/* ─── AI OUTFIT GENERATOR ───────────────────────────────────── */}
      <OutfitGenerator result={result} />

      {/* Style Tips */}
      {recommendations.style_tips?.length > 0 && (
        <section className="style-tips-section">
          <div className="auto-container">
            <div className="sec-title reveal" ref={addRef} style={{ textAlign: 'center' }}>
              <div className="title">Style Guide</div>
              <h2>Personal Style Tips</h2>
              <div className="section-divider"></div>
            </div>
            <div className="style-tips-grid">
              {recommendations.style_tips.map((tip, i) => (
                <div className={`style-tip-card reveal delay-${(i % 3) + 1}`} ref={addRef} key={i}>
                  <div className="tip-icon">{tipIcons[i % tipIcons.length]}</div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="results-cta-section">
        <div className="auto-container">
          <div className="results-cta-inner">
            <div className="sec-title light reveal" ref={addRef} style={{ textAlign: 'center' }}>
              <div className="title">Ready?</div>
              <h2>Discover More Looks</h2>
            </div>
            <p>Try a different photo and explore how your colors change with lighting and angles.</p>
            <button className="results-cta-btn" onClick={onAnalyzeAnother}>← Analyze Another Photo</button>
          </div>
        </div>
      </section>

    </div>
  );
}
