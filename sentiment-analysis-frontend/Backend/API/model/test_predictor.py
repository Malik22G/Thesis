
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

def test_invalid_data_type():
    input_texts = [None, 12345, {"text": "invalid"}, "Valid comment"]
    result = predict_sentiment(input_texts)

    # Only the last valid string should be processed
    assert len(result["comments"]) == 1
    assert result["comments"][0]["text"] == "Valid comment"
    assert result["comments"][0]["sentiment"] in {"positive", "negative", "neutral"}


def test_sentiment_confidence_bounds():
    result = predict_sentiment(["Nice product", "Terrible service"])
    for comment in result["comments"]:
        assert 0.0 <= comment["confidence"] <= 1.0

def test_summary_probabilities_sum_to_one():
    result = predict_sentiment(["Amazing", "Horrible", "Meh"])
    total = sum(result["summary"][s] for s in ["positive", "negative", "neutral"])
    assert abs(total - 1.0) < 0.01

def test_mixed_sentiments_batch():
    texts = ["Great!", "Awful!", "Okay."]
    result = predict_sentiment(texts)
    sentiments = {c["sentiment"] for c in result["comments"]}
    assert len(sentiments) >= 2

def test_long_text_truncation():
    long_text = "excellent " * 200  # >512 tokens
    result = predict_sentiment([long_text])
    assert result["comments"][0]["sentiment"] in {"positive", "negative", "neutral"}
