import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const FIELDS = [
  { key: "study_hours", label: "Study Hours / Day", min: 0, max: 12, step: 0.5 },
  { key: "attendance_pct", label: "Attendance %", min: 0, max: 100, step: 1 },
  { key: "previous_score", label: "Previous Score", min: 0, max: 100, step: 1 },
  { key: "assignment_completion", label: "Assignment Completion %", min: 0, max: 100, step: 1 },
  { key: "sleep_hours", label: "Sleep Hours / Day", min: 0, max: 12, step: 0.5 },
  { key: "participation", label: "Class Participation (1-10)", min: 1, max: 10, step: 1 },
  { key: "previous_performance", label: "Previous Performance (1-10)", min: 1, max: 10, step: 1 },
];

const DEFAULTS = {
  study_hours: 4,
  attendance_pct: 80,
  previous_score: 70,
  assignment_completion: 85,
  sleep_hours: 7,
  participation: 6,
  previous_performance: 6,
};

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export default function PredictionForm({ onResult }) {
  const [values, setValues] = useState(DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: Number(val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Prediction failed.");
      onResult(data, values);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-5"
    >
      <h2 className="text-xl font-bold text-brandBlue">Enter Student Data</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FIELDS.map((f) => (
          <div key={f.key} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              {f.label}
            </label>
            <input
              type="number"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[f.key]}
              onChange={(e) => handleChange(f.key, e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandPurple"
              required
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded-lg p-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-brandBlue hover:bg-brandPurple transition-colors text-white font-semibold rounded-xl py-3 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Predicting...
          </>
        ) : (
          <>
            <Sparkles size={18} /> Predict Performance
          </>
        )}
      </button>
    </form>
  );
}
