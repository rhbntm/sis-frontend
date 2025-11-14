import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import AttendancePage from "./pages/AttendancePage";
import GradesPage from "./pages/GradesPage";
import GpaSummaryPage from "./pages/GpaSummaryPage";
import PaymentsPage from "./pages/PaymentsPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/grades" element={<GradesPage />} />
        <Route path="/gpa-summary" element={<GpaSummaryPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
