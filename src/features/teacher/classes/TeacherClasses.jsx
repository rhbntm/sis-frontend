import { useEffect, useState } from "react";
import { getTeacherClasses } from "../../../services/teacherApi";
import { Link } from "react-router-dom";

export default function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teacherId = 1; // TEMP (replace with auth later)

    getTeacherClasses(teacherId)
      .then((data) => setClasses(data))
      .catch((err) => console.error("Failed to load teacher classes:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📚 My Classes</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        {loading ? (
          <p className="text-gray-600">Loading classes...</p>
        ) : classes.length === 0 ? (
          <p className="text-gray-600">No assigned classes.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls) => (
              <div
                key={cls.section_id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h2 className="font-semibold text-lg">
                  {cls.name || cls.course_code || "Course"}
                </h2>

                <p className="text-gray-700">
                  Section: <strong>{cls.section_id}</strong>
                </p>

                <p className="text-gray-700">
                  Semester: <strong>{cls.semester}</strong>
                </p>

                <p className="text-gray-500">{cls.schedule}</p>

                <Link
                  to={`/teacher/classes/${cls.section_id}`}
                  className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Students
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
