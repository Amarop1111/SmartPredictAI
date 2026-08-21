"""
recommendations.py
Rule-based recommendation engine. Generates personalized suggestions
based on input thresholds, working alongside the ML model's prediction.
"""

def generate_recommendations(features: dict, prediction: str):
    recs = []

    if features["study_hours"] < 3:
        recs.append("Increase daily study time to at least 3-4 hours.")
    if features["attendance_pct"] < 85:
        recs.append("Improve class attendance to above 85%.")
    if features["assignment_completion"] < 90:
        recs.append("Complete all assignments on time.")
    if features["sleep_hours"] < 7:
        recs.append("Aim for 7-8 hours of healthy sleep per night.")
    if features["participation"] < 6:
        recs.append("Participate more actively in class discussions.")
    if features["previous_score"] < 60:
        recs.append("Review foundational topics from previous coursework.")

    if not recs:
        if prediction == "Excellent":
            recs.append("Great work — keep up your current study habits!")
        else:
            recs.append("Maintain your current habits and stay consistent.")

    return recs
