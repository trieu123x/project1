import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Admin({ items,users }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");


  useEffect(() => {
    if (role !== "admin") {
      navigate("/"); // không phải admin thì đá về trang chủ
    }
  }, [role, navigate]);


  return (
    <div className="flex ">
      {/* Sidebar */}
      <aside className="w-64 h-70 sticky top-0 mt-6 rounded-2xl bg-gradient-to-b from-purple-200 to-white shadow-2xl p-6 border-r border-gray-200">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-extrabold mb-8 text-blue-600 tracking-wide">
          Admin
        </h1>

        {/* Navigation */}
        <nav className="space-y-3">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 text-left p-3 rounded-xl font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <i className="fa fa-home text-blue-500"></i>
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/sanpham")}
            className="w-full flex items-center gap-3 text-left p-3 rounded-xl font-medium text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
          >
            <i className="fa fa-box text-green-500"></i>
            Products
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="w-full flex items-center gap-3 text-left p-3 rounded-xl font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition"
          >
            <i class="fa fa-address-card text-purple-500" aria-hidden="true"></i>
            Users
          </button>
        </nav>
      </aside>

      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </div>
  );
}
