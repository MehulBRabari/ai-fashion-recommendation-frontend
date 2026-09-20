import React, { useState, useRef, useCallback } from 'react';
import { analyzeImage } from '../utils/api';
import './ImageUpload.css';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageUpload({ onStart, onSuccess, onError }) {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileInfo, setFileInfo]   = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;

    // Validate type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      onError(new Error('Invalid file type. Please upload a JPG, PNG, or WebP image.'));
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      onError(new Error('File too large. Maximum size is 10MB.'));
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(0) + ' KB' });
    };
    reader.readAsDataURL(file);
  }, [onError]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file && !preview) {
      onError(new Error('Please select an image first.'));
      return;
    }

    // If file was from input, use it directly; otherwise re-fetch from input
    const selectedFile = fileInputRef.current?.files?.[0];
    if (!selectedFile) {
      onError(new Error('Please select a file again.'));
      return;
    }

    onStart();
    try {
      const result = await analyzeImage(selectedFile);
      if (!result.success) {
        throw new Error(result.error || 'Analysis failed.');
      }
      onSuccess(result);
    } catch (err) {
      onError(err);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setFileInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="upload-container">
      {!preview ? (
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="Upload image"
        >
          <div className="drop-icon">⊕</div>
          <p className="drop-title">Drop your human face photo here</p>
          <p className="drop-subtitle">or click to browse — JPG, PNG, WebP</p>
          <p className="drop-hint">Only real human face photos are accepted · clear face, good lighting</p>
        </div>
      ) : (
        <div className="preview-container">
          <div className="preview-img-wrap">
            <img src={preview} alt="Preview" className="preview-img" />
            <button className="preview-clear" onClick={handleClear} aria-label="Remove image">✕</button>
          </div>
          {fileInfo && (
            <p className="file-info">{fileInfo.name} · {fileInfo.size}</p>
          )}
          <button className="analyze-btn" onClick={handleAnalyze}>
            <span className="btn-icon">✦</span>
            Analyze Human Face & Skin
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleInputChange}
        className="hidden-input"
        aria-hidden="true"
      />
    </div>
  );
}
