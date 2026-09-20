import React, { useState } from 'react';
import './ColorPalette.css';

export default function ColorPalette({ title, subtitle, colors, type }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={`palette-card palette-${type}`}>
      <div className="palette-header">
        <div>
          <h3 className="palette-title">{title}</h3>
          <p className="palette-subtitle">{subtitle}</p>
        </div>
        <span className="palette-icon">{type === 'best' ? '✓' : '✕'}</span>
      </div>

      <div className="palette-swatches">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`swatch-item ${hovered === i ? 'hovered' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="swatch-color"
              style={{ background: color.hex }}
              title={color.hex}
            />
            <div className="swatch-meta">
              <span className="swatch-name">{color.name}</span>
              {hovered === i && (
                <span className="swatch-reason">{color.reason}</span>
              )}
              {hovered !== i && (
                <span className="swatch-code">{color.hex}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
