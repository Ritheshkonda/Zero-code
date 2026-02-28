import { useState, useRef, useEffect } from "react";
import axios from "axios";

/* ── Inline custom dropdown — no new deps ─────────────────────────── */
const FRAMEWORKS = [
  { value: "react",   label: "React + Tailwind" },
  { value: "angular", label: "Angular" },
];

function FrameworkSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = FRAMEWORKS.find((f) => f.value === value) || FRAMEWORKS[0];

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="custom-select-wrap">
      {/* Trigger */}
      <button
        type="button"
        className={`custom-select-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="custom-select-label">{selected.label}</span>
        <svg
          className={`custom-select-chevron ${open ? "rotated" : ""}`}
          width="15" height="15"
          viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul className="custom-select-menu" role="listbox">
          {FRAMEWORKS.map((f) => (
            <li
              key={f.value}
              role="option"
              aria-selected={f.value === value}
              className={`custom-select-option ${f.value === value ? "selected" : ""}`}
              onMouseDown={() => {
                onChange(f.value);
                setOpen(false);
              }}
            >
              {f.value === value && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Main Upload component ────────────────────────────────────────── */
export default function Upload({ setLayout, setCode, setLoading }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [framework, setFramework] = useState("react");

  // ── Business logic unchanged ──────────────────────────────────────
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      alert("Please upload an image.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("framework", framework);
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/generate/", formData);
      setLayout(res.data.layout);
      setCode(res.data.code);
    } catch (err) {
      alert("Backend error.");
    } finally {
      setLoading(false);
    }
  };
  // ─────────────────────────────────────────────────────────────────

  return (
    <div className="upload-container">

      {/* ── Drop zone ─────────────────────────────────────────────── */}
      <label className="drop-zone">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {preview ? (
          <div className="image-preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
          </div>
        ) : (
          <>
            <div className="upload-icon-wrap">
              <svg
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary-light)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className="upload-primary-text">Click to upload a screenshot</span>
            <span className="upload-secondary-text">or drag &amp; drop it here</span>
            <span className="upload-file-types">PNG · JPG · WebP</span>
          </>
        )}
      </label>

      {/* ── Controls row ──────────────────────────────────────────── */}
      <div className="input-group">
        <FrameworkSelect value={framework} onChange={setFramework} />

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={!file}
        >
          Generate Code
        </button>
      </div>

      {/* ── Trust row ─────────────────────────────────────────────── */}
      <div className="trust-row">
        <span className="trust-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          React &amp; Tailwind ready
        </span>
        <span className="trust-dot" />
        <span className="trust-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Angular ready
        </span>
        <span className="trust-dot" />
        <span className="trust-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secure processing
        </span>
        <span className="trust-dot" />
        <span className="trust-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          No sign-up required
        </span>
      </div>

    </div>
  );
}
