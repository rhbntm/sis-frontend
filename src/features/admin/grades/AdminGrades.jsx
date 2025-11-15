import React, { useEffect, useState } from "react";
import {
  getGrades,
  addGrade,
  updateGrade,
  deleteGrade,
  getStudents,
  getCourses,
} from "../services/api";

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newGrade, setNewGrade] = useState({
    student_id: "",
    course_id: "",
    grade: "",
    gpa: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    grade: "",
    gpa: "",
  });

  // Fetch all data on initial load
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [gradesData, studentsData, coursesData] = await Promise.all([
        getGrades(),
        getStudents(),
        getCourses(),
      ]);

      setGrades(gradesData);
      setStudents(studentsData);
      setCourses(coursesData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleChange = (e) => {
    setNewGrade({
      ...newGrade,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addGrade({
        ...newGrade,
        grade: newGrade.grade.toUpperCase(),
      });

      setNewGrade({ student_id: "", course_id: "", grade: "", gpa: "" });
      await loadAll();

      alert("✅ Grade added successfully!");
    } catch (error) {
      console.error("Failed to add grade:", error);
      alert("❌ Could not add grade.");
    }
  };

  const startEdit = (record) => {
    setEditingId(record.record_id);
    setEditData({
      grade: record.grade,
      gpa: record.gpa,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ grade: "", gpa: "" });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = async (id) => {
    try {
      await updateGrade(id, {
        grade: editData.grade.toUpperCase(),
        gpa: editData.gpa,
      });

      setEditingId(null);
      setEditData({ grade: "", gpa: "" });

      await loadAll();
    } catch (error) {
      console.error("Failed to update grade:", error);
    }
  };

  const removeGrade = async (id) => {
    if (!confirm("Delete this grade?")) return;

    try {
      await deleteGrade(id);
      await loadAll();
    } catch (error) {
      console.error("Failed to delete grade:", error);
    }
  };

  // Helpers for table display
  const getStudentName = (id) => {
    const s = students.find((x) => x.student_id === id);
    return s ? `${s.first_name} ${s.last_name}` : id;
  };

  const getCourseTitle = (id) => {
    const c = courses.find((x) => x.course_id === id);
    return c ? `${c.title} (${c.course_code})` : id;
  };

  if (loading) return <p className="p-6">Loading grades...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">📚 Grades Management</h1>

      {/* Add Grade Form */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Grade</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Student Dropdown */}
            <select
              name="student_id"
              value={newGrade.student_id}
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

            {/* Course Dropdown */}
            <select
              name="course_id"
              value={newGrade.course_id}
              onChange={handleChange}
              className="border rounded p-2"
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.title} ({c.course_code})
                </option>
              ))}
            </select>

            {/* Grade */}
            <input
              type="text"
              name="grade"
              value={newGrade.grade}
              onChange={handleChange}
              placeholder="Grade (e.g. A, B+)"
              className="border rounded p-2"
              required
            />

            {/* GPA */}
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              name="gpa"
              value={newGrade.gpa}
              onChange={handleChange}
              placeholder="GPA (0.00–4.00)"
              className="border rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            Add Grade
          </button>
        </form>
      </section>

      {/* Grades Table */}
      <section className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Grade Records</h2>

        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Record ID</th>
              <th className="border px-3 py-2">Student</th>
              <th className="border px-3 py-2">Course</th>
              <th className="border px-3 py-2">Grade</th>
              <th className="border px-3 py-2">GPA</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {grades.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No grades recorded.
                </td>
              </tr>
            ) : (
              grades.map((g) => (
                <tr key={g.record_id} className="hover:bg-gray-50 transition">
                  <td className="border px-3 py-2">{g.record_id}</td>

                  {/* Student */}
                  <td className="border px-3 py-2">{getStudentName(g.student_id)}</td>

                  {/* Course */}
                  <td className="border px-3 py-2">{getCourseTitle(g.course_id)}</td>

                  {/* Grade */}
                  <td className="border px-3 py-2">
                    {editingId === g.record_id ? (
                      <input
                        type="text"
                        name="grade"
                        value={editData.grade}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-20"
                      />
                    ) : (
                      g.grade
                    )}
                  </td>

                  {/* GPA */}
                  <td className="border px-3 py-2">
                    {editingId === g.record_id ? (
                      <input
                        type="number"
                        min="0"
                        max="4"
                        step="0.01"
                        name="gpa"
                        value={editData.gpa}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-20"
                      />
                    ) : (
                      g.gpa
                    )}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    {editingId === g.record_id ? (
                      <>
                        <button
                          onClick={() => saveEdit(g.record_id)}
                          className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(g)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeGrade(g.record_id)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
