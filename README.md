# Sentiment Analysis SentiMeter

Advanced sentiment analysis powered by AI. This project enables users to analyze sentiments through multiple input methods, offering real-time insights and interactive visual reports.


## Features

- **Text Analysis**: Analyze sentiment from direct text input.
- **CSV Upload**: Batch process large volumes of feedback from CSV files.
- **YouTube Comments**: Extract and analyze sentiment of comments from YouTube videos.
- **Visual Reports**: Interactive charts and graphs for clear sentiment visualization.
- **Real-Time Analysis**: Get results in seconds for rapid decision-making.


## Technologies

- **Frontend**: React.js, Next.js, Tailwind CSS, Framer Motion, Recharts
- **Backend**: FastAPI, Python, PyTorch, Hugging Face Transformers (DeBERTa)
- **Deployment**: Docker, GitHub, Vercel (optional)

## Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Python 3.9+
- Docker (optional, for containerized deployment)
- Git

### Clone the Repository

```bash
git clone https://github.com/Malik22G/Thesis.git
```
```bash
cd Thesis\sentiment-analysis-frontend\
```

## Usage

### Backend

Navigate to the backend folder:

```bash
cd Backend/API
```

Create and activate a virtual environment:

```bash
python -m venv venv
# macOS/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app:app --reload
```

### Frontend

Navigate to the frontend folder:

```bash
cd sentiment-analysis-frontend
```

Install dependencies:

```bash
npm install
```

Set up environment variables in `.env`:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

### POST `/predict`

Analyze sentiment for one or more text inputs.

**Request Body:**

```json
{
  "text": ["Loved the app!", "Could be better."]
}
```

**Response:**

```json
{
  "summary": {
    "positive": 0.5,
    "negative": 0.3,
    "neutral": 0.2,
    "overall": "positive"
  },
  "comments": [
    {
      "text": "I love this product!",
      "sentiment": "positive",
      "confidence": 0.99,
      "all_probs": {"positive": 0.99, "negative": 0.005, "neutral": 0.005}
    }
  ],
  "aspects": []
}
```

## Project Structure

```bash
sentiment-analysis-frontend/
├── .next/
├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   └── styles/
├── Backend API/
│   ├── model/
│   ├── utils/
│   ├── predictor.py
│   ├── app.py
│   ├── requirements.txt
│   ├── test_predictor.py
│   ├── test_csv_upload.py
│   └── test_app.py
├── node_modules/
├── .env.local
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements, bug fixes, or new features.



## Acknowledgments

- Microsoft DeBERTa Model
- Hugging Face Transformers
- FastAPI by Sebastián Ramírez
- React, Tailwind CSS, Framer Motion, Recharts
