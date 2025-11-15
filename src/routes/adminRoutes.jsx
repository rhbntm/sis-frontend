// src/routes/adminRoutes.jsx
import React from "react";
import ProtectedRoute from "../components/shared/ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../features/admin/dashboard/AdminDashboard";
import AdminStudents from "../features/admin/students/AdminStudents";
import AdminCourses from "../features/admin/courses/AdminCourses";
import AdminPayments from "../features/admin/payments/AdminPayments";
import AdminAttendance from "../features/admin/attendance/AdminAttendance";
import AdminGrades from "../features/admin/grades/AdminGrades";
import AdminGpaSummary from "../features/admin/gpa/AdminGpaSummary";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/students",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminStudents />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/courses",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminCourses />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/payments",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminPayments />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/attendance",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminAttendance />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/grades",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminGrades />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/gpa-summary",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AdminGpaSummary />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
];
