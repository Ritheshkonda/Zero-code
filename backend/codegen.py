import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_code(layout_text, framework):

    if framework == "react":
        tech = "React with TailwindCSS"
    else:
        tech = "Angular with SCSS"

    prompt = f"""
    Generate a simple responsive {tech} application.

    Layout description:
    {layout_text}

    Requirements:
    - Single file output
    - Clean structure
    - No explanation
    - Output only code
    """

    payload = {
        "model": "deepseek-coder:6.7b",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=620)
        response.raise_for_status()
        return response.json()["response"]
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Ollama (codegen): {e}")
        raise RuntimeError("Ollama service is not running or unreachable. Please start Ollama locally.")
