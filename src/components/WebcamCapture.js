import React, { useRef, useState, useCallback, useEffect } from 'react';
import { analyzeWebcamFrame } from '../utils/api';
import './WebcamCapture.css';

export default function WebcamCapture({ onStart, onSuccess, onError }) {
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus]     = useState('idle');  // idle | requesting | live | captured | error
  const [capturedImg, setCapturedImg] = useState(null);
  const [camError, setCamError] = useState(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const startCamera = async () => {
    setStatus("requesting");
    setCamError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setStatus("live");
    } catch (err) {
      const msg =
        err.name === "NotAllowedError"
          ? "Camera access denied. Please allow camera access in your browser settings."
          : `Camera error: ${err.message}`;

      setCamError(msg);
      setStatus("error");
    }
  };

  const captureFrame = useCallback(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    // Mirror horizontally (selfie view)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImg(dataUrl);
    stopCamera();
    setStatus('captured');
  }, [stopCamera]);

  const handleAnalyze = async () => {
    if (!capturedImg) return;
    onStart();
    try {
      const result = await analyzeWebcamFrame(capturedImg);
      if (!result.success) throw new Error(result.error || 'Analysis failed.');
      onSuccess(result);
    } catch (err) {
      onError(err);
    }
  };

  const handleRetake = () => {
    setCapturedImg(null);
    setStatus('idle');
  };

  return (
    <div className="webcam-container">
      {/* Hidden canvas for capturing frames */}
      <canvas ref={canvasRef} className="hidden-canvas" />

      {status === 'idle' && (
        <div className="webcam-idle">
          <div className="webcam-icon">◉</div>
          <p className="webcam-title">Live Camera Analysis</p>
          <p className="webcam-subtitle">Face the camera in good lighting for best results</p>
          <button className="cam-btn primary" onClick={startCamera}>
            Enable Camera
          </button>
        </div>
      )}

      {status === 'requesting' && (
        <div className="webcam-idle">
          <div className="webcam-spinner" />
          <p className="webcam-subtitle">Requesting camera access…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="webcam-idle">
          <div className="webcam-icon error">⚠</div>
          <p className="webcam-title">Camera Unavailable</p>
          <p className="webcam-subtitle">{camError}</p>
          <button className="cam-btn secondary" onClick={() => setStatus('idle')}>
            Try Again
          </button>
        </div>
      )}

      {(status === 'live' || status === 'requesting') && (
        <div className="webcam-live-wrap">
          <div className="webcam-frame">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              className="webcam-video"
              autoPlay
              playsInline
              muted
            />
            <div className="face-guide">
              <div className="face-guide-oval" />
              <span className="face-guide-label">Center your face here</span>
            </div>
          </div>
          <button className="cam-btn primary capture" onClick={captureFrame}>
            <span className="capture-dot" />
            Capture Photo
          </button>
          <button className="cam-btn ghost" onClick={() => { stopCamera(); setStatus('idle'); }}>
            Cancel
          </button>
        </div>
      )}

      {status === 'captured' && capturedImg && (
        <div className="webcam-captured">
          <div className="preview-img-wrap">
            <img src={capturedImg} alt="Captured frame" className="preview-img" />
          </div>
          <p className="webcam-subtitle">Photo captured — ready to analyze</p>
          <div className="captured-actions">
            <button className="cam-btn primary" onClick={handleAnalyze}>
              <span>✦</span> Analyze My Style
            </button>
            <button className="cam-btn secondary" onClick={handleRetake}>
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
