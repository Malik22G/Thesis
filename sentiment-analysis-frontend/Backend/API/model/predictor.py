import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model_path = "./deberta_finetuned"
tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
model = AutoModelForSequenceClassification.from_pretrained(model_path, local_files_only=True).to(device)
model.eval()

id2label = {0: "positive", 1: "negative", 2: "neutral"}

def clean_text(t: str) -> str:
    return t.strip()[:512]

def predict_sentiment(texts: list[str], batch_size: int = 32):
    print("✅ Running predict_sentiment on:", len(texts), "texts")

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
            total_probs["positive"] += p[0]
            total_probs["negative"] += p[1]
            total_probs["neutral"] += p[2]

    n = len(results)
    avg_probs = {
        "positive": total_probs["positive"] / n,
        "negative": total_probs["negative"] / n,
        "neutral": total_probs["neutral"] / n
    }
    overall_label = max(avg_probs, key=avg_probs.get)

    return {
        "summary": {
            "positive": avg_probs["positive"],
            "negative": avg_probs["negative"],
            "neutral": avg_probs["neutral"],
            "overall": overall_label
        },
        "comments": results,
        "aspects": []  
    }
