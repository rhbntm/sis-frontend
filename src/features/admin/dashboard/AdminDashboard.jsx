import { useEffect, useState } from "react";

// Modular service imports
import { getStudents } from "../../../services/students";
import { getCourses } from "../../../services/courses";
import { getDepartments } from "../../../services/departments";
import { getAttendance } from "../../../services/attendance";
import { getPayments } from "../../../services/payments";
import { getQuote } from "../../../services/quotes";
import { getWeather } from "../../../services/weather";

import {
  Users,
  BookOpen,
  Building2,
  CalendarCheck,
  CreditCard,
  Quote,
  CloudSun,
} from "lucide-react";

export default function AdminDashboard() {
  const [quote, setQuote] = useState("Loading...");
  const [weather, setWeather] = useState(null);

  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    departments: 0,
    attendance: 0,
    payments: 0,
  });

  useEffect(() => {
    fetchQuote();
    fetchWeather();
    fetchStats();
  }, []);

  // Fetching quote from backend API
  const fetchQuote = async () => {
    try {
      const data = await getQuote();
      setQuote(data[0]?.quote || "Stay motivated and keep learning!");
    } catch (err) {
      console.error("Quote fetch error:", err);
      setQuote("Stay motivated and keep learning!");
    }
  };

  // Fetch weather from backend API
  const fetchWeather = async () => {
    try {
      const data = await getWeather("Manila");
      setWeather(data.current_weather);
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  };

  // Fetch dashboard stats
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

      {/* Quotes API Widget */}
      <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl shadow-sm">
        <div className="flex items-start gap-3">
          <Quote className="text-blue-600" size={24} />
          <p className="text-gray-700 italic text-lg">“{quote}”</p>
        </div>
      </div>

      {/* Weather API Widget */}
      {weather && (
        <div className="p-5 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl shadow-sm flex items-center gap-4">
          <CloudSun className="text-yellow-600" size={28} />
          <div>
            <p className="text-gray-700 text-lg font-semibold">Manila Weather</p>
            <p className="text-gray-600">
              Temperature: <strong>{weather.temperature}°C</strong>
            </p>
            <p className="text-gray-600">
              Windspeed: <strong>{weather.windspeed} km/h</strong>
            </p>
          </div>
        </div>
      )}

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
