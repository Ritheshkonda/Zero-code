import { useState } from "react";
import axios from "axios";

export default function Upload({ setLayout, setCode, setLoading }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [framework, setFramework] = useState("react");

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

      const res = await axios.post(
        "http://127.0.0.1:8000/generate/",
        formData
      );

      setLayout(res.data.layout);
      setCode(res.data.code);
    } catch (err) {
      alert("Backend error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
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
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px", opacity: 0.5 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Click to upload or drag and drop</span>
            <span style={{ fontSize: "0.8rem", marginTop: "4px", opacity: 0.6 }}>PNG, JPG or WebP</span>
          </>
        )}
      </label>

      <div className="input-group">
        <select onChange={(e) => setFramework(e.target.value)} value={framework}>
          <option value="react">React (Tailwind)</option>
          <option value="angular">Angular</option>
        </select>

        <button 
          className="generate-btn" 
          onClick={handleGenerate}
          disabled={!file}
        >
          Generate Code
        </button>
      </div>
    </div>
  );
}
