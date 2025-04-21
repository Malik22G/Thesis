
import numpy as np
import pytest
from predictor import predict_sentiment

def test_single_text_prediction():
    input_text = "I absolutely love this product!"
    result = predict_sentiment([input_text])
    
    assert "summary" in result
    assert "comments" in result
    assert len(result["comments"]) == 1
    
    comment_result = result["comments"][0]
    for key in ["text", "sentiment", "confidence", "all_probs"]:
        assert key in comment_result
    
    assert comment_result["sentiment"] in {"positive", "negative", "neutral"}
    assert isinstance(comment_result["confidence"], float)
    assert 0.0 <= comment_result["confidence"] <= 1.0

def test_batch_text_prediction():
    input_texts = [
      "This is amazing, I love it!",
      "Worst experience ever. Totally disappointed.",
      "It's okay, not great but not terrible."
    ]
    result = predict_sentiment(input_texts)
    assert "comments" in result
    assert len(result["comments"]) == len(input_texts)
    
    for comment in result["comments"]:
         for key in ["text", "sentiment", "confidence", "all_probs"]:
             assert key in comment

def test_empty_input():
    result = predict_sentiment([])
    assert "summary" in result
    summary = result["summary"]
    assert summary["positive"] == 0.0
    assert summary["negative"] == 0.0
    assert summary["neutral"] == 0.0
    assert summary["overall"] == "neutral"
    assert result["comments"] == []
    assert result["aspects"] == []
