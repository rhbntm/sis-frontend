import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RootRedirect() {
  const { user } = useAuth();

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin → admin dashboard
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Teacher → teacher dashboard
  if (user.role === "teacher") {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  // Unknown role → unauthorized
  return <Navigate to="/unauthorized" replace />;
}
