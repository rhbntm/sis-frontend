import { BrowserRouter, Routes, Route } from "react-router-dom";

import { publicRoutes } from "./routes/publicRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { teacherRoutes } from "./routes/teacherRoutes";

export default function App() {
  const allRoutes = [...publicRoutes, ...adminRoutes, ...teacherRoutes];

  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
