import React from "react";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <header className="w-full bg-transparent text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-orange-500 hover:text-orange-400 transition-colors"
        >
          E-Cell IIT BHU
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link
            to="/courses"
            className="px-4 py-1.5 border border-white-200 rounded-full bg-black text-white font-semibold hover:bg-orange-400 transition-colors"
          >
            Courses
          </Link>

          <Link
            to="/register"
            className="px-4 py-1.5 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
