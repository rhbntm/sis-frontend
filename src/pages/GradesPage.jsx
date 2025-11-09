import React, { useEffect, useState } from "react";
import {
  getGrades,
  addGrade,
  updateGrade,
  deleteGrade,
  getStudents,
  getCourses,
} from "../services/api";

const GradesPage = () => {
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

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
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
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewGrade({ ...newGrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGrade(newGrade);
      setNewGrade({ student_id: "", course_id: "", grade: "", gpa: "" });
      fetchAllData();
    } catch (error) {
      console.error("Failed to add grade:", error);
    }
  };

  const startEdit = (record) => {
    setEditingId(record.record_id);
    setEditData({ grade: record.grade, gpa: record.gpa });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ grade: "", gpa: "" });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      await updateGrade(id, editData);
      setEditingId(null);
      setEditData({ grade: "", gpa: "" });
      fetchAllData();
    } catch (error) {
      console.error("Failed to update grade:", error);
    }
  };

  const removeGrade = async (id) => {
    if (!window.confirm("Are you sure you want to delete this grade?")) return;
    try {
      await deleteGrade(id);
      fetchAllData();
    } catch (error) {
      console.error("Failed to delete grade:", error);
    }
  };

  if (loading) return <p className="p-6">Loading grades...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

      {/* ✅ Add Grade Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border rounded-lg bg-gray-50"
      >
        <h2 className="text-lg font-semibold mb-2">Add New Grade</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <select
            name="student_id"
            value={newGrade.student_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.first_name} {s.last_name} (ID: {s.student_id})
              </option>
            ))}
          </select>

          <select
            name="course_id"
            value={newGrade.course_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.title} ({c.course_code})
              </option>
            ))}
          </select>

          <input
            type="text"
            name="grade"
            value={newGrade.grade}
            onChange={handleChange}
            placeholder="Grade (e.g. A, B+)"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            step="0.01"
            name="gpa"
            value={newGrade.gpa}
            onChange={handleChange}
            placeholder="GPA"
            className="border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Grade
        </button>
      </form>

      {/* ✅ Grades Table with Edit/Delete */}
      {grades.length === 0 ? (
        <p>No grade records found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Record ID</th>
              <th className="border p-2">Student ID</th>
              <th className="border p-2">Course ID</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">GPA</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.record_id}>
                <td className="border p-2">{g.record_id}</td>
                <td className="border p-2">{g.student_id}</td>
                <td className="border p-2">{g.course_id}</td>
                <td className="border p-2">
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
                <td className="border p-2">
                  {editingId === g.record_id ? (
                    <input
                      type="number"
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
                <td className="border p-2 text-center">
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
                        className="bg-gray-400 text-white px-2 py-1 rounded"
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GradesPage;
