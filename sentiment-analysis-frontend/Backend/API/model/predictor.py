import torch
import torch.nn.functional as F
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Device setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load tokenizer and model
model_path = "./deberta_finetuned"
tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
model = AutoModelForSequenceClassification.from_pretrained(model_path, local_files_only=True).to(device)
model.eval()

# Label mapping
id2label = {0: "positive", 1: "negative", 2: "neutral"}

# Clean input text
def clean_text(t: str) -> str:
    return t.strip()[:512]

# Convert numpy values to native Python types
def convert_numpy(obj):
    if isinstance(obj, np.generic):
        return obj.item()
    elif isinstance(obj, dict):
        return {k: convert_numpy(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy(i) for i in obj]
    return obj

# Predict sentiment
def predict_sentiment(texts: list[str], batch_size: int = 32):
    print("Running predict_sentiment on:", len(texts), "texts")

    cleaned_texts = [clean_text(t) for t in texts if isinstance(t, str) and t.strip()]

    if not cleaned_texts:
        return {
            "summary": {"positive": 0.0, "negative": 0.0, "neutral": 0.0, "overall": "neutral"},
            "comments": [],
            "aspects": []
        }

    results = []
    total_probs = {"positive": 0.0, "negative": 0.0, "neutral": 0.0}

    for i in range(0, len(cleaned_texts), batch_size):
        batch_texts = cleaned_texts[i:i + batch_size]
        inputs = tokenizer(batch_texts, padding=True, truncation=True, return_tensors="pt").to(device)

        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probs = F.softmax(logits, dim=-1).cpu().numpy()

        for text, p in zip(batch_texts, probs):
            max_index = int(p.argmax())
            sentiment = id2label.get(max_index, "neutral")
            confidence = float(p[max_index])
            result = {
                "text": text,
                "sentiment": sentiment,
                "confidence": confidence,
                "all_probs": {
                    "positive": float(p[0]),
                    "negative": float(p[1]),
                    "neutral": float(p[2])
                }
            }
            results.append(result)
            total_probs["positive"] += float(p[0])
            total_probs["negative"] += float(p[1])
            total_probs["neutral"] += float(p[2])

    n = len(results)
    avg_probs = {
        "positive": total_probs["positive"] / n,
        "negative": total_probs["negative"] / n,
        "neutral": total_probs["neutral"] / n
    }
    overall_label = max(avg_probs, key=avg_probs.get)

    response = {
        "summary": {
            "positive": avg_probs["positive"],
            "negative": avg_probs["negative"],
            "neutral": avg_probs["neutral"],
            "overall": overall_label
        },
        "comments": results,
        "aspects": []
    }

    return convert_numpy(response)
