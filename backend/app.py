from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from vision import extract_layout
from codegen import generate_code
import os

app = FastAPI()

# MongoDB Configuration
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.zerocode
history_collection = db.history

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

    # Save to history
    history_item = {
        "layout": layout_text,
        "code": code,
        "framework": framework,
        "timestamp": datetime.utcnow()
    }
    await history_collection.insert_one(history_item)

    return {
        "layout": layout_text,
        "code": code
    }

@app.get("/history/")
async def get_history():
    cursor = history_collection.find().sort("timestamp", -1).limit(20)
    history = []
    async for document in cursor:
        history.append({
            "id": str(document["_id"]),
            "layout": document["layout"][:100] + "...", # Truncate for list
            "framework": document["framework"],
            "timestamp": document["timestamp"].isoformat()
        })
    return history
