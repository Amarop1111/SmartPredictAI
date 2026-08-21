"""
train_model.py
Loads student_data.csv, trains a Decision Tree Classifier to predict
student performance category, evaluates accuracy, and saves the model.
"""

import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "student_data.csv")
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "smartpredict_model.pkl")
ENCODER_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "label_encoder.pkl")

FEATURES = [
    "study_hours",
    "attendance_pct",
    "previous_score",
    "assignment_completion",
    "sleep_hours",
    "participation",
    "previous_performance",
]
TARGET = "performance_category"


def main():
    # 1. Load dataset
    df = pd.read_csv(DATA_PATH)

    # 2. Clean & preprocess
    df = df.dropna()

    # 3. Encode categorical target
    encoder = LabelEncoder()
    y = encoder.fit_transform(df[TARGET])
    X = df[FEATURES]

    # 4. Train / test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 5. Train Decision Tree
    model = DecisionTreeClassifier(
        max_depth=6, min_samples_leaf=5, random_state=42
    )
    model.fit(X_train, y_train)

    # 6. Evaluate
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Test accuracy: {acc:.3f}")
    print(classification_report(y_test, y_pred, target_names=encoder.classes_))

    # 7. Save model + encoder
    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoder, ENCODER_PATH)
    print(f"Saved model -> {MODEL_PATH}")
    print(f"Saved label encoder -> {ENCODER_PATH}")


if __name__ == "__main__":
    main()
