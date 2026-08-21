"""
predict.py
Loads the trained model + label encoder and exposes a predict() helper
used by app.py.
"""

import os
import joblib
import pandas as pd

_MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
_MODEL_PATH = os.path.join(_MODEL_DIR, "smartpredict_model.pkl")
_ENCODER_PATH = os.path.join(_MODEL_DIR, "label_encoder.pkl")

_model = None
_encoder = None


def _load():
    global _model, _encoder
    if _model is None or _encoder is None:
        if not os.path.exists(_MODEL_PATH):
            raise FileNotFoundError(
                "Model not found. Run `python model/train_model.py` first "
                "(after generating data/student_data.csv)."
            )
        _model = joblib.load(_MODEL_PATH)
        _encoder = joblib.load(_ENCODER_PATH)
    return _model, _encoder


FEATURE_ORDER = [
    "study_hours",
    "attendance_pct",
    "previous_score",
    "assignment_completion",
    "sleep_hours",
    "participation",
    "previous_performance",
]


def predict(features: dict):
    """
    features: dict containing the 7 input parameters.
    Returns: (prediction_label: str, confidence: float)
    """
    model, encoder = _load()
    row = pd.DataFrame([[features[f] for f in FEATURE_ORDER]], columns=FEATURE_ORDER)
    pred_encoded = model.predict(row)[0]
    proba = model.predict_proba(row)[0]
    confidence = float(max(proba))
    label = encoder.inverse_transform([pred_encoded])[0]
    return label, round(confidence, 4)
