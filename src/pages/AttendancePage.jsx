import React, { useEffect, useState } from "react";
import {
  getAttendance,
  addAttendance,
  deleteAttendance,
  getStudents,
  getSections,
} from "../services/api";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default the date to today
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    student_id: "",
    section_id: "",
    date: today,
    status: "Present",
    remarks: "",
  });

  // Load all required data on mount
  useEffect(() => {
    loadAttendance();
    loadStudents();
    loadSections();
  }, []);

  const loadAttendance = async () => {
    try {
      const data = await getAttendance();
      setAttendance(data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const loadSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  // Generic handler for form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addAttendance(formData);

      // Reset form
      setFormData({
        student_id: "",
        section_id: "",
        date: today,
        status: "Present",
        remarks: "",
      });

      await loadAttendance();
      alert("✅ Attendance record added!");
    } catch (err) {
      console.error("Error adding record:", err);
      alert("❌ Failed to add attendance record.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this attendance record?")) return;

    try {
      await deleteAttendance(id);
      await loadAttendance();
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  // Helper to resolve names and titles in table
  const getStudentName = (id) => {
    const s = students.find((x) => x.student_id === id);
    return s ? `${s.first_name} ${s.last_name}` : id;
  };

  const getSectionLabel = (id) => {
    const sec = sections.find((x) => x.section_id === id);
    return sec ? `Section ${sec.section_id} – ${sec.semester}` : id;
  };

  const statusColors = {
    Present: "text-green-700 font-semibold",
    Absent: "text-red-600 font-semibold",
    Late: "text-yellow-600 font-semibold",
    Excused: "text-blue-600 font-semibold",
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">📝 Attendance Management</h1>

      {/* Add Attendance Form */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Add Attendance Record</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            {/* Student Dropdown */}
            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className="border rounded p-2"
              required
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.student_id} value={s.student_id}>
                  {s.first_name} {s.last_name}
                </option>
              ))}
            </select>

            {/* Section Dropdown */}
            <select
              name="section_id"
              value={formData.section_id}
              onChange={handleChange}
              className="border rounded p-2"
              required
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  Section {sec.section_id} – {sec.semester}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded p-2"
              required
            />

            {/* Status */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
              <option>Excused</option>
            </select>

            {/* Remarks */}
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
              className="border rounded p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            {loading ? "Saving..." : "Add Attendance"}
          </button>
        </form>
      </section>

      {/* Attendance Records Table */}
      <section className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>

        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Student</th>
              <th className="border px-3 py-2">Section</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Remarks</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendance.map((item) => (
                <tr key={item.attendance_id} className="hover:bg-gray-50 transition">
                  <td className="border px-3 py-2">{item.attendance_id}</td>

                  <td className="border px-3 py-2">
                    {getStudentName(item.student_id)}
                  </td>

                  <td className="border px-3 py-2">
                    {getSectionLabel(item.section_id)}
                  </td>

                  <td className="border px-3 py-2">{item.date}</td>

                  <td className={`border px-3 py-2 ${statusColors[item.status]}`}>
                    {item.status}
                  </td>

                  <td className="border px-3 py-2">{item.remarks}</td>

                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete(item.attendance_id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
