import React, { useState, useCallback } from 'react';
import { generateOutfit } from '../utils/api';
import './OutfitGenerator.css';

const CLOTHING_TYPES = [
  { type: 'tshirt',  label: 'T-Shirt',      icon: '👕' },
  { type: 'shirt',   label: 'Formal Shirt', icon: '👔' },
  { type: 'pants',   label: 'Pants',        icon: '👖' },
  { type: 'kurta',   label: 'Kurta',        icon: '🩱' },
  { type: 'jacket',  label: 'Jacket',       icon: '🧥' },
];

export default function OutfitGenerator({ result }) {
  const { analysis_id, skin_tone, undertone, recommendations } = result;
  const bestColors = recommendations?.best_colors || [];

  const [selectedType,  setSelectedType]  = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState(null);
  const [generated,     setGenerated]     = useState([]); // array of generated outfit objects

  const handleGenerate = useCallback(async () => {
    if (!selectedType || !selectedColor) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateOutfit({
        analysis_id,
        clothing_type: selectedType,
        color_name:    selectedColor.name,
        color_hex:     selectedColor.hex,
        skin_tone,
        undertone,
      });
      setGenerated(prev => [data, ...prev]);
    } catch (err) {
      setError(err.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedType, selectedColor, analysis_id, skin_tone, undertone]);

  const handleDownload = (item) => {
    const link = document.createElement('a');
    link.href     = `data:image/png;base64,${item.image_base64}`;
    link.download = `chromafit-${item.clothing_type}-${item.color_name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.click();
  };

  const canGenerate = selectedType && selectedColor && !loading;

  return (
    <section className="outfit-section">
      <div className="auto-container">

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="gemini-badge">
            <span className="gb-dot"></span>
            Powered by Gemini AI
          </div>
          <div className="sec-title" style={{ textAlign: 'center' }}>
            <div className="title">AI Outfit Studio</div>
            <h2>Generate Your <span style={{
              background: 'linear-gradient(135deg, var(--green), var(--blue))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Perfect Outfit</span></h2>
            <div className="section-divider"></div>
            <p style={{ marginTop: '14px', color: 'var(--text-grey)', fontSize: '15px' }}>
              Pick a clothing type and a color from your personalized palette.<br />
              Gemini AI will generate a matching outfit image just for you.
            </p>
          </div>
        </div>

        {/* Step 1 — Choose clothing type */}
        <div style={{ marginTop: '40px' }}>
          <span className="color-picker-label">Step 1 — Choose Clothing Type</span>
          <div className="clothing-selector">
            {CLOTHING_TYPES.map(c => (
              <button
                key={c.type}
                className={`cloth-btn${selectedType === c.type ? ' selected' : ''}`}
                onClick={() => setSelectedType(c.type)}
              >
                <span className="cloth-icon">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Choose color from palette */}
        <div className="color-picker-wrap">
          <span className="color-picker-label">Step 2 — Pick a Color from Your Palette</span>
          {bestColors.length === 0 ? (
            <p style={{ color: 'var(--text-grey)', fontSize: '14px' }}>No color palette found.</p>
          ) : (
            <div className="color-swatches">
              {bestColors.map((c, i) => (
                <div
                  key={i}
                  className={`cswatch${selectedColor?.hex === c.hex ? ' picked' : ''}`}
                  style={{ background: c.hex }}
                  title={`${c.name} — ${c.hex}`}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Selected color info */}
        {selectedColor && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="selected-color-strip">
              <div className="selected-color-dot" style={{ background: selectedColor.hex }} />
              <span>{selectedColor.name}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>{selectedColor.hex}</span>
            </div>
          </div>
        )}

        {/* Step 3 — Generate */}
        <div className="gen-btn-wrap">
          <button
            className="gen-btn"
            onClick={handleGenerate}
            disabled={!canGenerate}
          >
            {loading ? (
              <>
                <span className="gen-spinner"></span>
                Generating with Gemini AI…
              </>
            ) : (
              <>✨ Generate Outfit Image</>
            )}
          </button>
          {(!selectedType || !selectedColor) && (
            <p style={{ fontSize: '12px', color: 'var(--text-grey)', marginTop: '10px' }}>
              {!selectedType && !selectedColor ? 'Select a clothing type and color to generate' :
               !selectedType ? 'Select a clothing type first' : 'Select a color from your palette'}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="outfit-error">
            ⚠️ {error}
            <br />
            <button
              onClick={() => setError(null)}
              style={{ marginTop: '8px', background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="outfit-grid" style={{ marginTop: '0' }}>
            <div className="outfit-skeleton">
              <div className="skel-img"></div>
              <div className="skel-body">
                <div className="skel-line"></div>
                <div className="skel-line s"></div>
              </div>
            </div>
          </div>
        )}

        {/* Generated cards */}
        {!loading && generated.length > 0 && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-grey)' }}>
                {generated.length} outfit{generated.length > 1 ? 's' : ''} generated
              </span>
            </div>
            <div className="outfit-grid">
              {generated.map((item, i) => (
                <div className="outfit-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="outfit-img-box">
                    <img
                      src={`data:image/png;base64,${item.image_base64}`}
                      alt={`${item.clothing_label} in ${item.color_name}`}
                    />
                    <div
                      className="outfit-color-dot"
                      style={{ background: item.color_hex }}
                      title={item.color_name}
                    />
                  </div>
                  <div className="outfit-card-body">
                    <div className="outfit-card-type">{item.clothing_label}</div>
                    <div className="outfit-card-color">
                      {item.color_name}
                      <span className="outfit-card-hex">{item.color_hex}</span>
                    </div>
                    <button
                      className="download-btn"
                      onClick={() => handleDownload(item)}
                    >
                      ⬇ Download Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && generated.length === 0 && !error && (
          <div className="outfit-hint">
            <span className="outfit-hint-icon">👗</span>
            Choose a clothing type + color above, then hit <strong>Generate</strong>.<br />
            AI will create a matching outfit image based on your skin tone palette.
          </div>
        )}

      </div>
    </section>
  );
}
