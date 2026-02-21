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

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const handleHistorySelect = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://127.0.0.1:8000/history/${id}`);
      setLayout(res.data.layout);
      setCode(res.data.code);
    } catch (err) {
      console.error("Failed to fetch history item:", err);
      alert("Failed to open history item. Please try again.");
    } finally {
      setLoading(false);
    }
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
              <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
            </button>
          </div>
          <div className="brand">
            Zerocode
          </div>
        </header>

        <section className="app">
          <header className="header">
            <h1>Magic UI Generation</h1>
            <p>From screenshot to pixel-perfect code in seconds.</p>
          </header>

          <div className="card glass-card">
            <Upload
              setLayout={setLayout}
              setCode={setCode}
              setLoading={setLoading}
            />
          </div>

          {loading && (
            <div className="loading">
              <span className="spinner"></span>
              Generating your code...
            </div>
          )}

          <CodeViewer layout={layout} code={code} />
        </section>
      </main>
    </div>
  );
}

export default App;
