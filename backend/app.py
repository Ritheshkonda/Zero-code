from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from vision import extract_layout
from codegen import generate_code

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate/")
async def generate(image: UploadFile = File(...), framework: str = Form(...)):
    
    image_bytes = await image.read()

    layout_text = extract_layout(image_bytes)
    code = generate_code(layout_text, framework)

    return {
        "layout": layout_text,
        "code": code
    }
