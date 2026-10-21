import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import InputSection from "./components/InputSection";
import ResultsSection from "./components/ResultsSection";
import LoadingOverlay from "./components/LoadingOverlay";
import ErrorBanner from "./components/ErrorBanner";
import "./App.css";

function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        padding: "80px 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(0,112,188,0.06) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          pointerEvents: "none",
        }}
      ></div>
      <div className="auto-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.5fr 1.5fr 1.5fr",
            gap: "50px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "linear-gradient(135deg, #0070bc, #403ab4)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                AF
              </div>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                AI FASHION ADVISOR
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: "1.8",
                marginBottom: "24px",
              }}
            >
              AI-powered fashion color advisor. Discover your perfect color
              palette based on skin tone and undertone analysis.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                maxWidth: "300px",
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.06)",
                  border: "none",
                  color: "#fff",
                  fontSize: "13px",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "10px 14px",
                  background: "#0070bc",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                →
              </button>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                color: "#fff",
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: "2px solid rgba(0,112,188,0.3)",
              }}
            >
              Quick Links
            </div>

            {[
              { label: "Home", href: "#home" },
              { label: "Analyze", href: "#analyze" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Features", href: "#features" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "10px",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                }
              >
                <span style={{ color: "#0070bc", fontSize: "18px" }}>›</span>
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                color: "#fff",
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: "2px solid rgba(0,112,188,0.3)",
              }}
            >
              Contact
            </div>
            {[
              { icon: "✉", text: "support@af.ai" },
              { icon: "🤖", text: "AI Fashion Advisor" },
              { icon: "📍", text: "Available Worldwide" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#0070bc", width: "16px" }}>
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {["𝕏", "in", "f", "▶"].map((icon, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "60px",
            padding: "20px 0",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
            Copyright © 2026 <span style={{ color: "#0070bc" }}>AF</span>. All
            Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
  };

  const handleAnalysisSuccess = (result) => {
    setIsLoading(false);
    setAnalysisResult(result);
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleAnalysisError = (err) => {
    setIsLoading(false);
    setError(err.message || "Analysis failed. Please try again.");
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* Page Loader */}
      <div className={`page-loader${loaded ? " hidden" : ""}`}>
        <div className="loader-inner">
          <div className="loader-logo">
            AI <span>FASHION ADVISOR</span>
          </div>
          <div className="loader-ring"></div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        className={`scroll-to-top${scrolled ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      <Header />

      <main>
        {!analysisResult && (
          <>
            <HeroSection />
            <InputSection
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onStart={handleAnalysisStart}
              onSuccess={handleAnalysisSuccess}
              onError={handleAnalysisError}
              error={error}
              onDismissError={() => setError(null)}
            />
          </>
        )}

        {error && analysisResult && (
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
          >
            <ErrorBanner
              message={error}
              onDismiss={() => setError(null)}
              onRetry={handleReset}
            />
          </div>
        )}

        {analysisResult && (
          <ResultsSection
            result={analysisResult}
            onAnalyzeAnother={handleReset}
          />
        )}
      </main>

      {!analysisResult && <Footer />}

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
