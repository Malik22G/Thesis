from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_predict_endpoint_single():
    payload = {"text": "I love this!"}
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert "comments" in data
    comment = data["comments"][0]
    assert comment["sentiment"] in {"positive", "negative", "neutral"}

def test_predict_endpoint_batch():
    payload = {"texts": ["Great product!", "Not what I expected."]}
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "comments" in data
    assert len(data["comments"]) == 2

def test_predict_endpoint_empty():
    payload = {}  
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "error" in data
