export default function CodeViewer({ layout, code }) {
  if (!layout && !code) return null;

  return (
    <div className="output-grid">
      <div className="output-card">
        <h2>Extracted Layout</h2>
        <pre>{layout}</pre>
      </div>

      <div className="output-card">
        <div className="code-header">
          <h2>Generated Code</h2>
          <button onClick={() => navigator.clipboard.writeText(code)}>
            Copy
          </button>
        </div>
        <pre>{code}</pre>
      </div>
    </div>
  );
}
