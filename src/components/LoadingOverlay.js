import React from 'react';
import './LoadingOverlay.css';

const MESSAGES = [
  'Detecting face…',
  'Extracting skin regions…',
  'Analyzing skin tone…',
  'Detecting undertone…',
  'Building your color palette…',
];

export default function LoadingOverlay() {
  const [msgIdx, setMsgIdx] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overlay" role="status" aria-live="polite" aria-label="Analyzing image">
      <div className="overlay-box">
        <div className="spinner-ring">
          <div className="spinner-inner" />
        </div>
        <div className="overlay-logo">AI <span>FASHION ADVISOR</span></div>
        <p className="overlay-msg">{MESSAGES[msgIdx]}</p>
        <div className="overlay-dots">
          {[0,1,2,3,4].map(i => (
            <span
              key={i}
              className={`dot ${i <= msgIdx ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
