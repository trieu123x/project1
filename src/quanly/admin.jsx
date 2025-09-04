import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Admin({ items }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/"); // không phải admin thì đá về trang chủ
    }
  }, [role, navigate]);

  useEffect(() => {
    fetch(`https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-4">
        <h1 className="text-2xl font-bold mb-6">Admin</h1>
        <nav className="space-y-3">
          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left p-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/sanpham")}
            className="w-full text-left p-2 rounded hover:bg-gray-100"
          >
            Products
          </button>
        </nav>
      </aside>

      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </div>
  );
}
