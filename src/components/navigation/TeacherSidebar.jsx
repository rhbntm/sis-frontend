import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, CalendarCheck, ClipboardList, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function TeacherSidebar({ onToggle }) {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const { logout } = useAuth();

  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);
    onToggle(newState);
  };

  const navItems = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: <Home size={20} /> },
    { name: "My Classes", path: "/teacher/classes", icon: <BookOpen size={20} /> },
    { name: "Attendance", path: "/teacher/attendance", icon: <CalendarCheck size={20} /> },
    { name: "Grade Entry", path: "/teacher/grades", icon: <ClipboardList size={20} /> },
  ];

  return (
    <div
      className={`
        fixed left-0 top-0 min-h-screen flex flex-col
        transition-all duration-300
        ${open ? "w-60" : "w-16"}
        bg-purple-700 text-white
      `}
    >
      {/* Header */}
      <div
        className={`
          cursor-pointer flex items-center transition-all duration-300
          ${open ? "justify-between px-4 py-4" : "justify-center py-3"}
        `}
        onClick={toggleSidebar}
      >
        {open && <span className="font-bold text-lg">Teacher Panel</span>}
        <span className="text-xl">{open ? "«" : "»"}</span>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 transition
                hover:bg-purple-600
                ${active ? "bg-purple-900" : ""}
              `}
            >
              {item.icon}
              <span className={`${open ? "block" : "hidden"}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={logout}
        className={`
          flex items-center gap-3 px-4 py-3 
          bg-red-600 hover:bg-red-700 transition
          w-full text-left mt-4
        `}
      >
        <LogOut size={20} />
        <span className={`${open ? "block" : "hidden"}`}>Logout</span>
      </button>

      {/* Footer */}
      <div className="p-4 text-center text-xs opacity-70">
        {open && "© 2025 SIS"}
      </div>
    </div>
  );
}
