import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
export default function Dangki() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "user",
    rePassword:"",
    email:""
  });
    const [err, setErr] = useState(false);
    const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({ ...form, [name]: value });
    if (name === "email") {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value) && value != "") setErr("Email không hợp lệ")
      else setErr(null)
    }
  };

  const handleRegister = async () => {
      try {
          const r = await fetch("https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user")
          const user = await r.json()
          const isDup = user.some((u) => u.username == form.username || u.name == form.name)
          if (isDup) {
              setErr("Tên đăng nhập hoặc tên người dùng đã tồn tại")
              setTimeout(() => {
                  setErr(false)
              }, 3000)
              return;
          }
          
          
          
      const res = await fetch(
        "https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
 
          alert("Đăng ký thành công!");
          navigate("/dangnhap")
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
      Tạo tài khoản mới
    </h2>

    <div className="space-y-5">
      {/* Tên người dùng */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          👤
        </span>
        <input
          type="text"
          name="name"
          placeholder="Tên người dùng"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
          </div>
          <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          👤
        </span>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

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
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔒
        </span>
        <input
          type="password"
          name="rePassword"
          placeholder="Nhập lại mật khẩu"
          value={form.rePassword}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    {/* Button */}
    <button
      onClick={() => {
        if (form.password !== form.rePassword && form.password !== "") {
          setErr("Mật khẩu nhập lại không khớp!");
          setTimeout(() => setErr(false), 3000);
          return;
        }
        if (
          !form.name ||
          !form.username ||
          !form.password ||
          !form.rePassword ||
          !form.email
        ) {
          setErr("Vui lòng nhập đầy đủ thông tin!");
          setTimeout(() => setErr(false), 3000);
          return;
        }
        handleRegister();
      }}
      className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300"
    >
      🚀 Đăng ký
    </button>

    {/* Gợi ý */}
    <p className="text-center text-sm text-gray-500 mt-6">
      Đã có tài khoản?{" "}
      <a
        onClick={()=>{navigate("/dangnhap")}}
        className="text-blue-500 font-medium hover:underline"
      >
        Đăng nhập ngay
      </a>
    </p>
  </div>
</div>

  );
}
