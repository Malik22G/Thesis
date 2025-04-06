from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Union
from model.predictor import predict_sentiment

app = FastAPI()

# Optional: Allow frontend (like localhost:3000) to access this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: Union[str, None] = None
    texts: Union[List[str], None] = None

@app.post("/predict")
def predict(request: TextInput):
    if request.texts:
        texts = request.texts
    elif request.text:
        texts = [request.text]
    else:
        return {"error": "No input text provided."}

    print(f"📥 Received {len(texts)} text(s) for prediction.")
    return predict_sentiment(texts)
