import { useState } from "react";
import axios from "axios";

export default function Upload({ setLayout, setCode, setLoading }) {
  const [file, setFile] = useState(null);
  const [framework, setFramework] = useState("react");

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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <select onChange={(e) => setFramework(e.target.value)}>
        <option value="react">React</option>
        <option value="angular">Angular</option>
      </select>

      <button onClick={handleGenerate}>
        Generate
      </button>
    </div>
  );
}
