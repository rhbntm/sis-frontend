import React, { useState } from "react";
import axios from "axios";

const GpaSummaryPage = () => {
  const [studentId, setStudentId] = useState("");
  const [gpaData, setGpaData] = useState(null);
  const [error, setError] = useState("");

  const handleFetchGPA = async () => {
    try {
      setError("");
      const response = await axios.get(
        `http://localhost/student_information_system/public/api/gpa/${studentId}`
      );
      setGpaData(response.data);
    } catch (err) {
      setGpaData(null);
      if (err.response && err.response.status === 404) {
        setError("No GPA data found for this student.");
      } else {
        setError("Failed to fetch GPA data.");
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎓 GPA Summary</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          className="border px-3 py-2 rounded flex-1"
        />
        <button
          onClick={handleFetchGPA}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {gpaData && (
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold">Student ID: {gpaData.student_id}</p>
          <p className="text-lg mt-1">
            Average GPA: <span className="font-bold">{gpaData.average_gpa}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GpaSummaryPage;
