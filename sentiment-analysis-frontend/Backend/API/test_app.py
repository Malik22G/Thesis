from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_predict_endpoint_single():
    # Test API prediction for a single text input
    payload = {"text": "I love this!"}
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    # Check that 'summary' and 'comments' are in the response
    assert "summary" in data
    assert "comments" in data
    # Validate the sentiment in the first comment
    comment = data["comments"][0]
    assert comment["sentiment"] in {"positive", "negative", "neutral"}

def test_predict_endpoint_batch():
    # Test API prediction with multiple texts
    payload = {"texts": ["Great product!", "Not what I expected."]}
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "comments" in data
    assert len(data["comments"]) == 2

def test_predict_endpoint_empty():
    # Test API response when no text is provided
    payload = {}  # No text or texts field
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    # When no input is provided, an error response is expected.
    assert "error" in data
