from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from bson import ObjectId
from vision import extract_layout
from codegen import generate_code
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# MongoDB Configuration
MONGO_URL = os.getenv("mongodb://username:password@localhost:27017/Zero-code", "mongodb://localhost:27017")
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

    try:
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
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred during generation.")

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

@app.get("/history/{item_id}")
async def get_history_item(item_id: str):
    try:
        document = await history_collection.find_one({"_id": ObjectId(item_id)})
        if document:
            return {
                "id": str(document["_id"]),
                "layout": document["layout"],
                "code": document["code"],
                "framework": document["framework"],
                "timestamp": document["timestamp"].isoformat()
            }
        raise HTTPException(status_code=404, detail="History item not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID format")
