import { useEffect, useState } from "react";
import { getStudents } from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents()
      .then(data => setStudents(data))
      .catch(err => console.error("Error fetching students:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Records</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Program</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={s.student_id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{s.first_name} {s.last_name}</td>
                <td className="p-2 border">{s.email}</td>
                <td className="p-2 border">{s.program_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
