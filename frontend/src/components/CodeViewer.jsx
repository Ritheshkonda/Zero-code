import { useState } from 'react';

export default function CodeViewer({ layout, code }) {
  const [copied, setCopied] = useState(false);

  // Business logic unchanged
  if (!layout && !code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="output-grid">

      {/* Extracted Layout */}
      <div className="output-card glass-card">
        <h2>Extracted Layout</h2>
        <pre>{layout}</pre>
      </div>

      {/* Generated Code */}
      <div className="output-card glass-card" id="code-output">
        <div className="code-header">
          <h2>Generated Code</h2>
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy Code
              </>
            )}
          </button>
        </div>
        <pre>{code}</pre>
      </div>

    </div>
  );
}
