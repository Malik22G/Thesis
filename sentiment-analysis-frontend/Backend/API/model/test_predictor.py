# test_predictor.py

import numpy as np
import pytest
from predictor import predict_sentiment

def test_single_text_prediction():
    # Test single text input
    input_text = "I absolutely love this product!"
    result = predict_sentiment([input_text])
    
    # Check that the output has the expected keys
    assert "summary" in result
    assert "comments" in result
    # Expect one result corresponding to one input text
    assert len(result["comments"]) == 1
    
    comment_result = result["comments"][0]
    for key in ["text", "sentiment", "confidence", "all_probs"]:
        assert key in comment_result
    
    # Validate that the sentiment is one of the expected values
    assert comment_result["sentiment"] in {"positive", "negative", "neutral"}
    # Validate that the confidence is a float between 0 and 1
    assert isinstance(comment_result["confidence"], float)
    assert 0.0 <= comment_result["confidence"] <= 1.0

def test_batch_text_prediction():
    # Test batch input with multiple texts
    input_texts = [
      "This is amazing, I love it!",
      "Worst experience ever. Totally disappointed.",
      "It's okay, not great but not terrible."
    ]
    result = predict_sentiment(input_texts)
    assert "comments" in result
    # Check we get as many responses as input texts
    assert len(result["comments"]) == len(input_texts)
    
    # Check the structure for each predicted comment
    for comment in result["comments"]:
         for key in ["text", "sentiment", "confidence", "all_probs"]:
             assert key in comment

def test_empty_input():
    # Test that an empty input list returns a default response
    result = predict_sentiment([])
    assert "summary" in result
    summary = result["summary"]
    # Expect all average probabilities to be 0.0 and overall to be "neutral"
    assert summary["positive"] == 0.0
    assert summary["negative"] == 0.0
    assert summary["neutral"] == 0.0
    assert summary["overall"] == "neutral"
    # Comments and aspects lists should be empty
    assert result["comments"] == []
    assert result["aspects"] == []
