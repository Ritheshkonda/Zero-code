import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sidebar({ onSelectItem }) {
  const [history, setHistory] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // ── Business logic unchanged ──────────────────────────────────────────
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/history/");
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    fetchHistory();
  }, []);

  const handleSelect = (id) => {
    setActiveId(id);
    onSelectItem(id);
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };
  // ─────────────────────────────────────────────────────────────────────

  return (
    <aside className="sidebar">

      {/* ── Brand — clicking reloads / starts a new project ────────── */}
      <button
        className="sidebar-brand"
        onClick={() => window.location.reload()}
        title="New project"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div className="sidebar-logo">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#6366f1"/>
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="10" fill="url(#logoGrad)"/>
            <polyline
              points="10,11 26,11 10,25 26,25"
              stroke="white" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              fill="none"
            />
            <circle cx="29" cy="11" r="3" fill="white" fillOpacity="0.35"/>
          </svg>
        </div>
        <span className="sidebar-brand-name">Zerocode</span>
      </button>

      {/* ── History nav ──────────────────────────────────────────────── */}
      <div className="sidebar-nav">
        <div className="sidebar-header">
          <h3>History</h3>
          <button
            className="new-btn"
            onClick={() => window.location.reload()}
            title="New project"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5"  y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div className="history-list">
          {history.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              padding: '32px 16px',
              textAlign: 'center',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                No history yet.<br/>Generate your first project.
              </span>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className={`history-item ${activeId === item.id ? 'active' : ''}`}
                onClick={() => handleSelect(item.id)}
              >
                <span className="item-title">{item.layout}</span>
                <span className="item-date">{formatTime(item.timestamp)}</span>
              </div>
            ))
          )}
        </div>
      </div>

    </aside>
  );
}
