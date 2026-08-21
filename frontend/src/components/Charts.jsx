import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample illustrative data — in a full deployment this would be
// fetched from the backend / dataset rather than hardcoded.
const studyVsPerformance = [
  { hours: 1, score: 42 },
  { hours: 2, score: 50 },
  { hours: 3, score: 58 },
  { hours: 4, score: 65 },
  { hours: 5, score: 72 },
  { hours: 6, score: 80 },
  { hours: 7, score: 86 },
  { hours: 8, score: 91 },
];

const attendanceVsPerformance = [
  { attendance: 60, score: 48 },
  { attendance: 70, score: 55 },
  { attendance: 80, score: 66 },
  { attendance: 85, score: 74 },
  { attendance: 90, score: 82 },
  { attendance: 95, score: 89 },
  { attendance: 100, score: 94 },
];

export default function Charts() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
      <h2 className="text-xl font-bold text-brandBlue">Performance Insights</h2>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Study Hours vs Performance
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={studyVsPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hours" label={{ value: "Hours/day", position: "insideBottom", offset: -2 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#06B6D4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Attendance vs Performance
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={attendanceVsPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="attendance" label={{ value: "Attendance %", position: "insideBottom", offset: -2 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
