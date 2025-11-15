// src/routes/teacherRoutes.jsx
import React from "react";
import ProtectedRoute from "../components/shared/ProtectedRoute";

import TeacherLayout from "../layouts/TeacherLayout";

import TeacherDashboard from "../features/teacher/dashboard/TeacherDashboard";
import TeacherClasses from "../features/teacher/classes/TeacherClasses";
import TeacherAttendance from "../features/teacher/attendance/TeacherAttendance";
import TeacherGrades from "../features/teacher/grades/TeacherGrades";

export const teacherRoutes = [
  {
    path: "/teacher/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherLayout>
          <TeacherDashboard />
        </TeacherLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/classes",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherLayout>
          <TeacherClasses />
        </TeacherLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/attendance",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherLayout>
          <TeacherAttendance />
        </TeacherLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/teacher/grades",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherLayout>
          <TeacherGrades />
        </TeacherLayout>
      </ProtectedRoute>
    ),
  },
];
