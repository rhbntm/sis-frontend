import { useAuth } from "../../../context/AuthContext";
import { BookOpen, CalendarCheck, Users } from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, Teacher!
      </h1>

      <p className="text-gray-600">
        Role: <strong>{user.role}</strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="p-5 bg-white shadow rounded-xl flex items-center gap-4">
          <BookOpen className="text-blue-600" size={28} />
          <div>
            <p className="text-lg font-semibold">Your Classes</p>
            <p className="text-gray-500 text-sm">3 Active</p>
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded-xl flex items-center gap-4">
          <CalendarCheck className="text-green-600" size={28} />
          <div>
            <p className="text-lg font-semibold">Attendance Tasks</p>
            <p className="text-gray-500 text-sm">Up to date</p>
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded-xl flex items-center gap-4">
          <Users className="text-purple-600" size={28} />
          <div>
            <p className="text-lg font-semibold">Students</p>
            <p className="text-gray-500 text-sm">Overview Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
