import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";


function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col">
          <main className="p-6 overflow-auto flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
