export default function CodeViewer({ layout, code }) {
  if (!layout && !code) return null;

  return (
    <div className="output-grid">
      <div className="output-card glass-card">
        <h2>Extracted Layout</h2>
        <pre>{layout}</pre>
      </div>

      <div className="output-card glass-card">
        <div className="code-header">
          <h2>Generated Code</h2>
          <button 
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            Copy Code
          </button>
        </div>
        <pre>{code}</pre>
      </div>
    </div>
  );
}
