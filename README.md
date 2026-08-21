# SmartPredict AI — Student Performance Predictor

A full-stack AI/ML web application that predicts student academic performance
(Excellent / Good / Average / Needs Improvement) from 7 input parameters,
using a Decision Tree Classifier, and gives personalized recommendations.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Recharts, Lucide Icons
- **Backend:** Python, Flask, Flask-CORS
- **ML:** Pandas, NumPy, Scikit-learn, Joblib

## Project Structure
```
SmartPredictAI/
├── backend/
│   ├── app.py                  # Flask app, /predict endpoint
│   ├── model/
│   │   ├── train_model.py      # trains + saves the Decision Tree
│   │   ├── predict.py          # loads model, runs predictions
│   │   ├── smartpredict_model.pkl
│   │   └── label_encoder.pkl
│   ├── data/
│   │   ├── generate_data.py    # creates synthetic dataset
│   │   └── student_data.csv
│   ├── utils/
│   │   └── recommendations.py  # rule-based recommendation engine
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── Charts.jsx
│   │   ├── pages/Home.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Setup & Run

### 1. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# (data + model are already included, but to regenerate from scratch:)
cd data && python generate_data.py && cd ..
python model/train_model.py

python app.py                   # runs on http://127.0.0.1:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm start                       # runs on http://localhost:3000
```

The frontend calls the backend at `http://127.0.0.1:5000` by default.
To point elsewhere, set `REACT_APP_API_URL` in a `.env` file inside `frontend/`.

## API

**POST** `/predict`

Request body:
```json
{
  "study_hours": 6,
  "attendance_pct": 92,
  "previous_score": 80,
  "assignment_completion": 100,
  "sleep_hours": 7.5,
  "participation": 9,
  "previous_performance": 8
}
```

Response:
```json
{
  "prediction": "Excellent",
  "confidence": 0.87,
  "recommendations": ["Great work — keep up your current study habits!"]
}
```

## Notes
- The dataset (`student_data.csv`) is synthetically generated for demonstration
  purposes; predictions do not constitute official academic evaluations.
- Model: `DecisionTreeClassifier(max_depth=6, min_samples_leaf=5)`.
