import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
export default function Dangnhap() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const r = await fetch("https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user");
      const users = await r.json();
      const user = users.find(
        (u) => u.username === form.username && u.password === form.password
      );
      if (user) {
        alert("Đăng nhập thành công");
        const token = `${user.id + user.name}-${Date.now()}`;
        localStorage.setItem("token", token);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", user.role);
        if (user.role = "admin") navigate("/admin")
        else navigate("/");
        return;
      } else {
        setErr("Sai tên đăng nhập hoặc mật khẩu!");
        setTimeout(() => setErr(false), 3000);
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-md">
        {/* Thông báo lỗi */}
        {err && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-lg text-center font-medium">
            {err}
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Đăng nhập
        </h2>

        <div className="space-y-5">
          {/* Tên người dùng */}

          {/* Tên đăng nhập */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              📧
            </span>
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={form.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mật khẩu */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔑
            </span>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Nhập lại mật khẩu */}
        </div>

        {/* Button */}
        <button
          onClick={() => {
            if (!form.username || !form.password) {
              setErr("Vui lòng nhập đầy đủ thông tin!");
              setTimeout(() => setErr(false), 3000);
              return;
            }
            handleLogin();
          }}
          className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300"
        >
          🚀 Đăng nhập
        </button>

        {/* Gợi ý */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Chưa có tài khoản?{" "}
          <a
            onClick={() => navigate("/dangki")}
            className="text-blue-500 font-medium hover:underline"
          >
            Đăng kí ngay
          </a>
        </p>
      </div>
    </div>
  );
}
