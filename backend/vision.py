import requests
import base64

OLLAMA_URL = "http://localhost:11434/api/generate"

def extract_layout(image_bytes):
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    prompt = """
    Describe the UI layout clearly.
    Mention:
    - Navbar
    - Sections
    - Buttons
    - Cards
    - Forms
    - Footer

    Keep it structured and concise.
    """

    payload = {
        "model": "llava:7b",
        "prompt": prompt,
        "images": [base64_image],
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=620)
        response.raise_for_status()
        print("OLLAMA RAW RESPONSE:", response.text)
        return response.json().get("response", "No response key found")
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Ollama (vision): {e}")
        raise RuntimeError("Ollama service is not running or unreachable. Please start Ollama locally.")

