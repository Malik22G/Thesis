
import io
import csv

def parse_csv(file_like_object):
    """
    Simulate parsing a CSV file where each row's first column is a text input.
    Returns a list of text strings.
    """
    reader = csv.reader(file_like_object)
    return [row[0] for row in reader if row]  

def test_parse_csv():
    csv_content = "This is comment one\nThis is comment two\nThis is comment three"
    file_like = io.StringIO(csv_content)
    texts = parse_csv(file_like)
    assert len(texts) == 3
    assert texts[0] == "This is comment one"
    assert texts[1] == "This is comment two"
    assert texts[2] == "This is comment three"

def test_large_csv_batch():
    comment = "This is a test comment."
    num_rows = 1000
    csv_content = "\n".join([comment for _ in range(num_rows)])
    file_like = io.StringIO(csv_content)
    texts = parse_csv(file_like)
    assert len(texts) == num_rows
    for text in texts:
         assert text == comment
