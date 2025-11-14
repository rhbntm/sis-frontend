import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar onToggle={setSidebarOpen} />

      {/* Main Content */}
      <main
        className={`
          flex-1 min-h-screen p-6 transition-all duration-300 
          bg-gray-50 text-gray-900
          ${sidebarOpen ? "ml-60" : "ml-16"}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
