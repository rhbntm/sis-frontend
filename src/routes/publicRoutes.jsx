// src/routes/publicRoutes.jsx
import React from "react";

import LoginPage from "../pages/LoginPage";
import Unauthorized from "../pages/Unauthorized";
import RootRedirect from "../components/shared/RootRedirect";

export const publicRoutes = [
  { path: "/", element: <RootRedirect /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/unauthorized", element: <Unauthorized /> },
];
