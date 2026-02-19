import { useState } from "react";
import Upload from "./components/Upload";
import CodeViewer from "./components/CodeViewer";
import "./App.css";

function App() {
  const [layout, setLayout] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1>Zerocode</h1>
        <p>Local Multimodal UI-to-Code Generator</p>
      </header>

      <div className="card">
        <Upload
          setLayout={setLayout}
          setCode={setCode}
          setLoading={setLoading}
        />
      </div>

      {loading && <div className="loading">Generating code...</div>}

      <CodeViewer layout={layout} code={code} />
    </div>
  );
}

export default App;
