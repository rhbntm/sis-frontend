import React, { useEffect, useState } from "react";

// ✅ Updated imports from modular services
import { getStudents } from "../../../services/students";
import { getGPA } from "../../../services/grades";

export default function GpaSummaryPage() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState("");
  const [gpaData, setGpaData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load students for dropdown
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleFetchGPA = async () => {
    if (!selected) return;

    setLoading(true);
    setError("");
    setGpaData(null);

    try {
      const data = await getGPA(selected);
      setGpaData(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No GPA data found for this student.");
      } else {
        setError("Failed to fetch GPA data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getStudentInfo = () => {
    return students.find((s) => s.student_id == selected);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🎓 GPA Summary</h1>

      {/* Select Student */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <select
            className="border px-3 py-2 rounded w-full"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.first_name} {s.last_name} (ID: {s.student_id})
              </option>
            ))}
          </select>

          <button
            onClick={handleFetchGPA}
            disabled={loading || !selected}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto disabled:opacity-60"
          >
            {loading ? "Fetching..." : "View GPA"}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>
      )}

      {/* GPA Results */}
      {gpaData && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          {/* Header info */}
          <div>
            <h2 className="text-xl font-bold text-gray-700">
              {getStudentInfo()?.first_name} {getStudentInfo()?.last_name}
            </h2>
            <p className="text-gray-500 text-sm">
              Student ID: {gpaData.student_id}
            </p>
          </div>

          {/* GPA Badge */}
          <div className="mt-2">
            <span className="px-4 py-2 text-lg font-bold rounded-lg bg-blue-100 text-blue-700">
              Average GPA: {gpaData.average_gpa}
            </span>
          </div>

          {/* Optional course breakdown */}
          {gpaData.courses?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Course Breakdown</h3>
              <table className="min-w-full border rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Course</th>
                    <th className="border p-2">Grade</th>
                    <th className="border p-2">GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {gpaData.courses.map((c, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">{c.title}</td>
                      <td className="border p-2">{c.grade}</td>
                      <td className="border p-2">{c.gpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
