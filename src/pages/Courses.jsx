import { useEffect, useState } from "react";
import { getCourses, addCourse, deleteCourse } from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    department_id: "",
    course_code: "",
    title: "",
    credit_hours: "",
  });
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addCourse(form);
      setForm({ department_id: "", course_code: "", title: "", credit_hours: "" });
      await loadCourses();
      alert("✅ Course added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add course");
    } finally {
      setLoading(false);
    }
  };

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
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Course Management</h1>

      {/* Add Course Form */}
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-xl shadow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Department ID"
            value={form.department_id}
            onChange={(e) => setForm({ ...form, department_id: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Course Code"
            value={form.course_code}
            onChange={(e) => setForm({ ...form, course_code: e.target.value })}
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
            onChange={(e) => setForm({ ...form, credit_hours: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>

      {/* Course Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Dept ID</th>
              <th className="border px-4 py-2">Course Code</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Credits</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.course_id}>
                  <td className="border px-4 py-2">{course.course_id}</td>
                  <td className="border px-4 py-2">{course.department_id}</td>
                  <td className="border px-4 py-2">{course.course_code}</td>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2">{course.credit_hours}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(course.course_id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
