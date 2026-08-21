"""
generate_data.py
Generates a synthetic student performance dataset for training SmartPredict AI.
Run this once to create student_data.csv, then run model/train_model.py.
"""

import numpy as np
import pandas as pd

np.random.seed(42)
N = 600

study_hours = np.round(np.random.uniform(0, 12, N), 1)
attendance_pct = np.round(np.random.uniform(40, 100, N), 1)
previous_score = np.round(np.random.uniform(30, 100, N), 1)
assignment_completion = np.round(np.random.uniform(20, 100, N), 1)
sleep_hours = np.round(np.random.uniform(3, 10, N), 1)
participation = np.random.randint(1, 11, N)
previous_performance = np.random.randint(1, 11, N)

# Weighted score used to derive a realistic label (not shown to the model directly)
composite = (
    study_hours * 3.0
    + attendance_pct * 0.6
    + previous_score * 0.5
    + assignment_completion * 0.4
    + sleep_hours * 1.0
    + participation * 1.5
    + previous_performance * 1.5
    + np.random.normal(0, 8, N)  # noise
)

# Quantile-based binning keeps the four classes reasonably balanced
q1, q2, q3 = np.percentile(composite, [25, 50, 75])

def label_from_composite(c):
    if c >= q3:
        return "Excellent"
    elif c >= q2:
        return "Good"
    elif c >= q1:
        return "Average"
    else:
        return "Needs Improvement"

labels = [label_from_composite(c) for c in composite]

df = pd.DataFrame({
    "study_hours": study_hours,
    "attendance_pct": attendance_pct,
    "previous_score": previous_score,
    "assignment_completion": assignment_completion,
    "sleep_hours": sleep_hours,
    "participation": participation,
    "previous_performance": previous_performance,
    "performance_category": labels,
})

df.to_csv("student_data.csv", index=False)
print(f"Generated {len(df)} rows -> student_data.csv")
print(df["performance_category"].value_counts())
