import React from 'react';
import './ErrorBanner.css';

export default function ErrorBanner({ message, onDismiss, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <div className="error-content">
        <span className="error-icon">⚠</span>
        <div className="error-text">
          <strong className="error-title">Analysis Failed</strong>
          <span className="error-msg">{message}</span>
        </div>
      </div>
      <div className="error-actions">
        {onRetry && (
          <button className="error-retry" onClick={onRetry}>Try Again</button>
        )}
        <button className="error-dismiss" onClick={onDismiss} aria-label="Dismiss">✕</button>
      </div>
    </div>
  );
}
