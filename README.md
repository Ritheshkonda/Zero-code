# 🚀 Zerocode

### Local Multimodal UI-to-Code Generator

Zerocode is a fully local AI-powered application that converts UI design images into functional frontend code (React or Angular) using open-source large language models.

It extracts layout structure from an image and generates clean component code — all running locally without external APIs.

---

## 🧠 Overview

Zerocode demonstrates multimodal AI integration by combining:

* Vision-language models for layout extraction
* Code generation models for frontend implementation
* A FastAPI backend pipeline
* A modern React-based interface

Everything runs locally using Ollama.

---

## 🏗 Architecture

```
Image Upload
     ↓
LLaVA (Layout Extraction)
     ↓
DeepSeek-Coder (Code Generation)
     ↓
FastAPI Backend
     ↓
React Frontend (Live Preview + Download)
```

### Environment

```
Windows
 ├── Ollama (localhost:11434)
 ├── FastAPI Backend (localhost:8000)
 └── React Frontend (localhost:5173)
```

No cloud APIs.
No external inference services.
Fully offline execution.

---

## ✨ Features

* Drag-and-drop image upload
* React / Angular code generation
* Live preview panel
* Download generated `.jsx` file
* Copy-to-clipboard functionality
* Animated loading spinner
* Modern dark UI
* Fully local LLM execution

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* Axios
* React Dropzone
* Custom UI Components

### Backend

* FastAPI
* Python
* Requests

### Models (via Ollama)

* `llava:7b` – Vision-language model for UI layout extraction
* `deepseek-coder:6.7b` – Code generation model

---

## 📦 Installation

### 1️⃣ Install Ollama

Download from:
[https://ollama.com/download](https://ollama.com/download)

Pull required models:

```
ollama pull llava:7b
ollama pull deepseek-coder:6.7b
```

Start Ollama:

```
ollama serve
```

---

### 2️⃣ Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🧪 Usage

1. Upload a UI screenshot.
2. Select framework (React or Angular).
3. Click Generate.
4. View:

   * Extracted layout description
   * Generated code
   * Live preview
5. Copy or download the generated component.

---

## ⚠️ Limitations

* Optimized for simple UI layouts
* Complex dashboards may produce imperfect layouts
* CPU-only inference may take 20–60 seconds
* Live preview supports basic React component rendering

---

## 🎯 Key Learning Outcomes

* Multimodal LLM integration
* Local AI model deployment
* Prompt engineering for structured output
* Full-stack AI application development
* Offline AI tool architecture

---

## 🚀 Future Improvements

* Component-based code splitting
* Tailwind / styled-system integration
* Code formatting with Prettier
* Streaming model responses
* Dockerized deployment

---

## 👨‍💻 Author

Rithesh
AI & ML Enthusiast
Full-stack AI Application Developer

---
