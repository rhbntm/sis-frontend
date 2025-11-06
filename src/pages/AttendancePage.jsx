import React, { useEffect, useState } from "react";
import {
  getAttendance,
  addAttendance,
  deleteAttendance,
  getStudents,
  getSections,     // 🆕
} from "../services/api";

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]); // 🆕 Section list
  const [formData, setFormData] = useState({
    student_id: "",
    section_id: "",
    date: "",
    status: "Present",
    remarks: "",
  });

  // Fetch data on load
  useEffect(() => {
    fetchAttendance();
    fetchStudents();
    fetchSections(); // 🆕
  }, []);

  const fetchAttendance = async () => {
    try {
      const data = await getAttendance();
      setAttendance(data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAttendance(formData);
      setFormData({
        student_id: "",
        section_id: "",
        date: "",
        status: "Present",
        remarks: "",
      });
      fetchAttendance();
    } catch (err) {
      console.error("Error adding record:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await deleteAttendance(id);
      fetchAttendance();
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-2xl shadow">
        <div className="grid grid-cols-5 gap-4">
          {/* Student Dropdown */}
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.first_name} {s.last_name}
              </option>
            ))}
          </select>

          {/* 🆕 Section Dropdown */}
          <select
            name="section_id"
            value={formData.section_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec.section_id} value={sec.section_id}>
                {sec.section_id} – {sec.semester}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
            <option>Excused</option>
          </select>

          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks"
            className="border p-2 rounded"
          />
        </div>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Attendance
        </button>
      </form>

      {/* Table (unchanged) */}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Student</th>
            <th className="p-2">Section</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Remarks</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((item) => (
            <tr key={item.attendance_id} className="border-t">
              <td className="p-2">{item.attendance_id}</td>
              <td className="p-2">{item.student_id}</td>
              <td className="p-2">{item.section_id}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">{item.remarks}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(item.attendance_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
