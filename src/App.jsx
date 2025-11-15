import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/shared/ProtectedRoute";

// layouts
import AdminLayout from "./layouts/AdminLayout";

// admin pages
import AdminDashboard from "./features/admin/dashboard/AdminDashboard";
import AdminStudents from "./features/admin/students/AdminStudents";
// import AdminCourses from "./features/admin/courses/AdminCourses";
// import AdminPayments from "./features/admin/payments/AdminPayments";
// import AdminGrades from "./features/admin/grades/AdminGrades";
// import AdminAttendance from "./features/admin/attendance/AdminAttendance";
// import AdminGpaSummary from "./features/admin/gpa/AdminGpaSummary";

// auth pages
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
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
