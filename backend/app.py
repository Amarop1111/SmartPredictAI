"""
app.py
Flask backend for SmartPredict AI.
Endpoint: POST /predict
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

from model.predict import predict, FEATURE_ORDER
from utils.recommendations import generate_recommendations

app = Flask(__name__)
CORS(app)  # enable CORS support for the React frontend


@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ok", "service": "SmartPredict AI backend"})


@app.route("/predict", methods=["POST"])
def predict_route():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Request body must be valid JSON."}), 400

    # --- Input validation ---
    missing = [f for f in FEATURE_ORDER if f not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    features = {}
    for f in FEATURE_ORDER:
        try:
            features[f] = float(data[f])
        except (TypeError, ValueError):
            return jsonify({"error": f"Field '{f}' must be a number."}), 400

    if not (0 <= features["study_hours"] <= 24):
        return jsonify({"error": "study_hours must be between 0 and 24."}), 400
    if not (0 <= features["attendance_pct"] <= 100):
        return jsonify({"error": "attendance_pct must be between 0 and 100."}), 400
    if not (0 <= features["previous_score"] <= 100):
        return jsonify({"error": "previous_score must be between 0 and 100."}), 400
    if not (0 <= features["assignment_completion"] <= 100):
        return jsonify({"error": "assignment_completion must be between 0 and 100."}), 400
    if not (0 <= features["sleep_hours"] <= 24):
        return jsonify({"error": "sleep_hours must be between 0 and 24."}), 400
    if not (1 <= features["participation"] <= 10):
        return jsonify({"error": "participation must be between 1 and 10."}), 400
    if not (1 <= features["previous_performance"] <= 10):
        return jsonify({"error": "previous_performance must be between 1 and 10."}), 400

    # --- Error handling around the model call ---
    try:
        label, confidence = predict(features)
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {e}"}), 500

    recommendations = generate_recommendations(features, label)

    return jsonify({
        "prediction": label,
        "confidence": confidence,
        "recommendations": recommendations,
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
