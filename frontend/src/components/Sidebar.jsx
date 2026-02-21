import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sidebar() {
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
      <div className="sidebar-header">
        <h3>History</h3>
        <button className="new-btn">+</button>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <span className="item-title">{item.layout}</span>
            <span className="item-date">{formatTime(item.timestamp)}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
