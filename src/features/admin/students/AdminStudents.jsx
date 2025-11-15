import { useEffect, useState } from "react";
import { getStudents } from "../../../services/students";  // FIXED PATH

export default function AdminStudents() {       // UPDATED NAME
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents()
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        👨‍🎓 Student Records
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-600">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-600">No student records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Student Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Program</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, idx) => (
                  <tr key={s.student_id} className="hover:bg-gray-50 transition">
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">
                      {s.first_name} {s.last_name}
                    </td>
                    <td className="p-2 border">{s.email}</td>
                    <td className="p-2 border">{s.program_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
