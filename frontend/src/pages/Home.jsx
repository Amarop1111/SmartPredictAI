import React, { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import ResultCard from "../components/ResultCard";
import Charts from "../components/Charts";
import { Brain } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <header className="bg-brandBlue text-white py-6 px-4 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Brain size={28} />
          <div>
            <h1 className="text-2xl font-bold">SmartPredict AI</h1>
            <p className="text-sm text-blue-100">
              Student Performance Predictor — AI/ML Web Application
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionForm onResult={(res) => setResult(res)} />

        <div className="space-y-6">
          {result ? <ResultCard result={result} /> : (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-gray-500 text-sm">
              Fill in the form and click <strong>Predict Performance</strong> to see the
              AI's prediction and personalized recommendations here.
            </div>
          )}
          <Charts />
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-6">
        SmartPredict AI — educational project. Predictions are for demonstration
        purposes only and do not constitute official academic evaluations.
      </footer>
    </div>
  );
}
