import { useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import CursorTrail from "./components/CursorTrail";
import Upload from "./components/Upload";
import CodeViewer from "./components/CodeViewer";
import "./App.css";

function App() {
  const [layout, setLayout] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showGenerator, setShowGenerator] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const handleHistorySelect = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://127.0.0.1:8000/history/${id}`);
      setLayout(res.data.layout);
      setCode(res.data.code);
      setShowGenerator(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to fetch history item:", err);
      alert("Failed to open history item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    setShowGenerator(true);
    setTimeout(() => {
      const element = document.getElementById("generate-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className={`main-layout ${theme === "light" ? "light-mode" : ""}`}>
      <CursorTrail />
      <Sidebar onSelectItem={handleHistorySelect} />

      <main className="main-content">
        <header className="top-nav">
          <div className="theme-toggle-container">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
              <span>{theme === "dark" ? "Dark" : "Light"}</span>
            </button>
          </div>
          <div className="nav-actions" />
        </header>

        <section className="app">
          <header className="header hero-section">
            <div className="grid-background"></div>
            <div className="hero-subtitle">
              AI-POWERED CODE GENERATION
            </div>
            <h1>Zerocode</h1>
            <p>From Screenshot to Production-Ready Code. Turn your UI designs into clean, structured code instantly.</p>
            
            <div className="hero-cta">
              <button className="btn-primary" onClick={handleGetStarted}>
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button className="btn-outline">
                Learn More
              </button>
            </div>
          </header>

          {showGenerator && (
            <div className="generator-content fade-in-up">
              <div id="generate-section" className="card glass-card">
                <Upload
                  setLayout={setLayout}
                  setCode={setCode}
                  setLoading={setLoading}
                />
              </div>

              {loading && (
                <div className="loading">
                  <span className="spinner" />
                  Analyzing layout and generating code…
                </div>
              )}

              <div className="output-section">
                <CodeViewer layout={layout} code={code} />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
