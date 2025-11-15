import { useEffect, useState } from "react";

// ✅ Updated modular service imports
import { getStudents } from "../../../services/students";
import { getCourses } from "../../../services/courses";
import { getDepartments } from "../../../services/departments";
import { getAttendance } from "../../../services/attendance";
import { getPayments } from "../../../services/payments";

import axios from "axios";
import {
  Users,
  BookOpen,
  Building2,
  CalendarCheck,
  CreditCard,
  Quote,
} from "lucide-react";

export default function AdminDashboard() {
  const [quote, setQuote] = useState("Loading...");
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    departments: 0,
    attendance: 0,
    payments: 0,
  });

  useEffect(() => {
    fetchQuote();
    fetchStats();
  }, []);

  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "N0dpxSF7n9ZzQWlKR7PTMw==89CmXknSEHwbmZrQ",
        },
      });
      setQuote(res.data[0]?.quote || "Stay motivated and keep learning!");
    } catch {
      setQuote("Stay motivated and keep learning!");
    }
  };

  const fetchStats = async () => {
    try {
      const [
        studentsData,
        coursesData,
        departmentsData,
        attendanceData,
        paymentsData,
      ] = await Promise.all([
        getStudents(),
        getCourses(),
        getDepartments(),
        getAttendance(),
        getPayments(),
      ]);

      setStats({
        students: studentsData.length,
        courses: coursesData.length,
        departments: departmentsData.length,
        attendance: attendanceData.length,
        payments: paymentsData.length,
      });
    } catch (err) {
      console.error("Dashboard data fetch failed:", err);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl shadow-sm">
        <div className="flex items-start gap-3">
          <Quote className="text-blue-600" size={24} />
          <p className="text-gray-700 italic text-lg">“{quote}”</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          label="Total Students"
          value={stats.students}
          color="blue"
        />

        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={stats.courses}
          color="green"
        />

        <StatCard
          icon={Building2}
          label="Departments"
          value={stats.departments}
          color="purple"
        />

        <StatCard
          icon={CalendarCheck}
          label="Attendance Records"
          value={stats.attendance}
          color="yellow"
        />

        <StatCard
          icon={CreditCard}
          label="Total Payments"
          value={stats.payments}
          color="red"
        />
      </div>
    </div>
  );
}
