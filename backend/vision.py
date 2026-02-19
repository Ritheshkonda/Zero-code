from urllib import response
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

    response = requests.post(OLLAMA_URL, json=payload)
    print("OLLAMA RAW RESPONSE:", response.text)
    return response.json().get("response", "No response key found")

