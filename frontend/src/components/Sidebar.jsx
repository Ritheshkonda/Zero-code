import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sidebar({ onSelectItem }) {
  const [history, setHistory] = useState([]);

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

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <aside className="sidebar">
      {/* Brand logo and name */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1"/>
                <stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="9" fill="url(#logoGrad)"/>
            {/* Z  arrow shape */}
            <polyline points="10,11 26,11 10,25 26,25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* small code dot accent */}
            <circle cx="29" cy="11" r="2.5" fill="#a5b4fc"/>
          </svg>
        </div>
        <span className="sidebar-brand-name">Zerocode</span>
      </div>

      <div className="sidebar-header">
        <h3>History</h3>
        <button className="new-btn" onClick={() => window.location.reload()}>+</button>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <div
            key={item.id}
            className="history-item"
            onClick={() => onSelectItem(item.id)}
          >
            <span className="item-title">{item.layout}</span>
            <span className="item-date">{formatTime(item.timestamp)}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
