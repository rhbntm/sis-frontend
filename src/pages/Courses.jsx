import { useEffect, useState } from "react";
import {
  getCourses,
  addCourse,
  deleteCourse,
  getDepartments,
} from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    department_id: "",
    course_code: "",
    title: "",
    credit_hours: "",
  });

  // Fetch courses
  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  // Fetch departments
  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  // Add course handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addCourse(form);
      setForm({
        department_id: "",
        course_code: "",
        title: "",
        credit_hours: "",
      });

      await loadCourses();
      alert("✅ Course added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;

    try {
      await deleteCourse(id);
      await loadCourses();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCourses();
    loadDepartments();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">📘 Course Management</h1>

      {/* Add Course Form */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Department Dropdown */}
            <select
              value={form.department_id}
              onChange={(e) =>
                setForm({ ...form, department_id: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Course Code (e.g. IT101)"
              value={form.course_code}
              onChange={(e) =>
                setForm({ ...form, course_code: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            />

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border rounded p-2 w-full"
              required
            />

            <input
              type="number"
              placeholder="Credit Hours"
              value={form.credit_hours}
              onChange={(e) =>
                setForm({ ...form, credit_hours: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </section>

      {/* Courses Table */}
      <section className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Course List</h2>

        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Course Code</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Credits</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course.course_id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-2">{course.course_id}</td>

                  <td className="border px-4 py-2">
                    {departments.find(
                      (d) => d.department_id === course.department_id
                    )?.name || "N/A"}
                  </td>

                  <td className="border px-4 py-2">{course.course_code}</td>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2">{course.credit_hours}</td>

                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(course.course_id)}
                      className="text-red-600 hover:text-red-700 font-medium"
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
