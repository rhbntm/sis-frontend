import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/shared/ProtectedRoute";

// layouts
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";

// admin pages
import AdminDashboard from "./features/admin/dashboard/AdminDashboard";
import AdminStudents from "./features/admin/students/AdminStudents";
// import AdminCourses from "./features/admin/courses/AdminCourses";
// import AdminPayments from "./features/admin/payments/AdminPayments";
// import AdminGrades from "./features/admin/grades/AdminGrades";
// import AdminAttendance from "./features/admin/attendance/AdminAttendance";
// import AdminGpaSummary from "./features/admin/gpa/AdminGpaSummary";

// teacher pages
import TeacherDashboard from "./features/teacher/dashboard/TeacherDashboard";
import TeacherClasses from "./features/teacher/classes/TeacherClasses";
import TeacherAttendance from "./features/teacher/attendance/TeacherAttendance";
import TeacherGrades from "./features/teacher/grades/TeacherGrades";

// auth pages
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";

// shared
import RootRedirect from "./components/shared/RootRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<RootRedirect />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* TEACHER ROUTES */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout>
                <TeacherDashboard />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/classes"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout>
                <TeacherClasses />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout>
                <TeacherAttendance />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/grades"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout>
                <TeacherGrades />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminStudents />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Repeat for other modules */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
