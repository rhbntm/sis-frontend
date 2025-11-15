import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);

    // Redirect based on role
    if (role === "admin") navigate("/admin/dashboard");
    if (role === "teacher") navigate("/teacher/dashboard");
    if (role === "student") navigate("/student/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-6">Login (Temporary Mock)</h1>

      <div className="flex flex-col gap-4">
        <button 
          onClick={() => handleLogin("admin")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Login as Admin
        </button>

        <button 
          onClick={() => handleLogin("teacher")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Login as Teacher
        </button>

        <button 
          onClick={() => handleLogin("student")}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg"
        >
          Login as Student
        </button>
      </div>
    </div>
  );
}
