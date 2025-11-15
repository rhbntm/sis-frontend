import React, { useState } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onToggle }) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);
    onToggle(newState);
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Students", path: "/students", icon: <UserGroupIcon className="w-5 h-5" /> },
    { name: "Courses", path: "/courses", icon: <BookOpenIcon className="w-5 h-5" /> },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />,
    },
    { name: "Grades", path: "/grades", icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
    { name: "GPA Summary", path: "/gpa-summary", icon: <ChartBarIcon className="w-5 h-5" /> },
    { name: "Payments", path: "/payments", icon: <CreditCardIcon className="w-5 h-5" /> },
  ];

  return (
    <div
      className={`
        fixed left-0 top-0 min-h-screen flex flex-col
        transition-all duration-300
        ${open ? "w-60" : "w-16"}
        bg-blue-700 text-white
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
        {open && <span className="font-bold text-lg">SIS Menu</span>}
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
                hover:bg-blue-600
                ${active ? "bg-blue-900" : ""}
              `}
            >
              {item.icon}
              <span className={`${open ? "block" : "hidden"}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 text-center text-xs opacity-70">
        {open && "© 2025 Student Information System"}
      </div>
    </div>
  );
};

export default Sidebar;
