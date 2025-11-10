import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import AttendancePage from "./pages/AttendancePage";
import GradesPage from "./pages/GradesPage";
import GpaSummaryPage from "./pages/GpaSummaryPage";
import PaymentsPage from "./pages/PaymentsPage";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col">
          <main className="p-6 overflow-auto flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/grades" element={<GradesPage />} />
              <Route path="/gpa-summary" element={<GpaSummaryPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
