import React from "react";
import { CheckCircle2, TrendingUp } from "lucide-react";

const CATEGORY_STYLES = {
  Excellent: { badge: "bg-cyan-100 text-cyan-800", bar: "bg-cyan-500" },
  Good: { badge: "bg-green-100 text-green-800", bar: "bg-green-500" },
  Average: { badge: "bg-yellow-100 text-yellow-800", bar: "bg-yellow-500" },
  "Needs Improvement": { badge: "bg-red-100 text-red-800", bar: "bg-red-500" },
};

export default function ResultCard({ result }) {
  if (!result) return null;
  const { prediction, confidence, recommendations } = result;
  const style = CATEGORY_STYLES[prediction] || CATEGORY_STYLES.Average;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-5 animate-[fadeIn_0.4s_ease]">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brandBlue">Prediction Result</h2>
        <CheckCircle2 className="text-green-500" size={22} />
      </div>

      <div className="flex items-center gap-3">
        <span className={`px-4 py-1.5 rounded-full font-semibold text-sm ${style.badge}`}>
          {prediction}
        </span>
        <span className="text-gray-500 text-sm">
          Confidence: {(confidence * 100).toFixed(1)}%
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${style.bar} transition-all duration-700`}
          style={{ width: `${confidence * 100}%` }}
        />
      </div>

      <div>
        <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
          <TrendingUp size={18} /> AI Recommendations
        </h3>
        <ul className="space-y-2">
          {recommendations.map((r, i) => (
            <li
              key={i}
              className="bg-brandPurple/5 border border-brandPurple/20 rounded-lg px-3 py-2 text-sm text-gray-700"
            >
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
