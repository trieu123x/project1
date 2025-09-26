import React, { useState, useRef, useEffect, useMemo } from "react";
import { data } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    avt: "",
    address: "",
    phone: "",
    description: "",
  });
  const [err, setErr] = useState(null);
  const [showLichSu, setShowLichSu] = useState(false);
  const [lichSuMuaHang, setLichSuMuaHang] = useState([]);
  const userId = localStorage.getItem("userId");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, ...form }; // merge dữ liệu trước
      setUser(updatedUser);

      const res = await fetch(
        `https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await res.json();
      setErr("Cập nhật thông tin thành công");
      setTimeout(() => setErr(false), 3000);
    } catch (loi) {
      setErr(`Thất bại ${loi}`);
      setTimeout(() => setErr(false), 3000);
    }
  };
  const handleSpend = async () => {
    try {
      const updatedUser = { ...user, spend: totalPrice }; // thêm trường spend
    setUser(updatedUser);

    const res = await fetch(
      `https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user/${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      }
      );
    } catch (loi) {
      console.log(loi)
    }
  }

  useEffect(() => {
    handleSpend()
  },[lichSuMuaHang])
  const handleClear = () => {
    setForm({
      avt: "",
      address: "",
      phone: "",
      description: "",
    });
  };
  useEffect(() => {
    if (userId) {
      fetch(`https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setForm(data);
          setLichSuMuaHang(data.order);
        })
        .catch((err) => console.error(err));
    }
  }, []);
  const totalPrice = useMemo(() => {
    const sum = lichSuMuaHang.reduce((sum, p) => {
      const q = p.cnt || 1;
      return sum + p.price * q;
    }, 0);
    return sum;
  }, [lichSuMuaHang]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50  to-white flex p-6">
      <div className="w-full items-center justify-center lg:items-start  flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
        {/* Profile Card */}
        <div className="w-full h-fit bg-gradient-to-br  from-violet-100 to-white rounded-3xl shadow-xl p-8 md:max-w-xl ">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <div
                className="h-32 w-32 rounded-full bg-slate-100 overflow-hidden ring-4 ring-blue-400 shadow-md cursor-pointer hover:scale-105 hover:ring-blue-500 transition"
                title="Chọn ảnh đại diện"
              >
                {form.avt ? (
                  <img
                    src={form.avt}
                    alt="Avatar Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                    + Ảnh
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </div>

            {/* User Info */}
            {user && (
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-slate-800">
                  {user.username}
                </p>
                <p className="text-gray-500">{user.email}</p>

                {/* Role */}
                <span className="mt-3 inline-block bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full shadow-sm">
                  Thành viên
                </span>

                {/* Total spending */}
                <div className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md">
                  Tổng đã tiêu: {totalPrice.toLocaleString("en-US")} VND
                </div>
              </div>
            )}
          </div>
        </div>

        {/* thong tin */}
        <div className="bg-gradient-to-br  from-green-100 to-white rounded-3xl shadow-2xl p-8 md:basis-1/2 w-full">
          {/* Thanh nav */}
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="relative flex justify-center bg-gray-100 rounded-2xl shadow-inner p-2 w-fit mx-auto">
              {/* Nút 1 */}
              <button
                onClick={() => setShowLichSu(false)}
                className="relative px-6 py-2 rounded-xl font-medium"
              >
                {!showLichSu && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-blue-500 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    showLichSu ? "text-gray-600" : "text-white"
                  }`}
                >
                  Thông tin
                </span>
              </button>

              {/* Nút 2 */}
              <button
                onClick={() => setShowLichSu(true)}
                className="relative px-6 py-2 rounded-xl font-medium"
              >
                {showLichSu && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-blue-500 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    !showLichSu ? "text-gray-600" : "text-white"
                  }`}
                >
                  Lịch sử mua hàng
                </span>
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl mt-2 p-8">
            {/* infomation */}
            {!showLichSu && (
              <div className="bg-white p-6 rounded-2xl shadow-lg space-y-5">
                {/* Link ảnh đại diện */}
                <div>
                  <label className="flex items-center gap-2 font-semibold mb-2">
                    <i className="fa fa-image text-blue-500"></i>
                    Link Ảnh đại diện
                  </label>
                  <input
                    className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    name="avt"
                    value={form.avt}
                    onChange={handleChange}
                    placeholder="Nhập link ảnh đại diện..."
                  />
                </div>

                {/* Địa chỉ */}
                <div>
                  <label className="flex items-center gap-2 font-semibold mb-2">
                    <i className="fa fa-home text-green-500"></i>
                    Địa chỉ
                  </label>
                  <input
                    className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ của bạn..."
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="flex items-center gap-2 font-semibold mb-2">
                    <i className="fa fa-phone text-yellow-500"></i>
                    Số điện thoại
                  </label>
                  <input
                    className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại..."
                  />
                </div>
                {/* Mô tả */}
                <div>
                  <label className="flex items-center gap-2 font-semibold mb-2">
                    <i className="fa fa-align-left text-purple-500"></i>
                    Mô tả
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-xl p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Nhập mô tả về bạn..."
                  />
                </div>
                <div className="flex justify-between gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow"
                  >
                    💾 Lưu thông tin
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow"
                  >
                    🗑 Xóa tất cả
                  </button>
                </div>
                {err && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }} // bắt đầu cao hơn và mờ
                    animate={{ y: 0, opacity: 1 }} // trượt xuống và hiện rõ
                    transition={{ duration: 0.4, ease: "easeOut" }} // thời gian và easing
                    className="fixed top-12 bg-green-100 text-green-600 p-3 mb-4 rounded-lg text-center font-medium shadow-lg w-fit mx-auto left-1/2 -translate-x-1/2"
                  >
                    {err}
                  </motion.div>
                )}
              </div>
            )}
            {/* lich su mua hang */}
            {showLichSu && (
              <div className="max-h-[600px] space-y-4 flex flex-col overflow-auto">
                {lichSuMuaHang.slice().reverse().map((product, index) => (
                  <li
                    key={index}
                    className="flex items-center w-full p-4 bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* Hình ảnh */}
                    <div className="relative">
                      <img
                        className="w-24 h-24 object-cover rounded-xl border shadow-sm"
                        src={product.image}
                        alt={product.title}
                      />
                      {/* Badge số lượng */}
                      {product.cnt > 1 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                          x{product.cnt}
                        </span>
                      )}
                    </div>

                    {/* Thông tin */}
                    <div className="flex flex-col flex-1 ml-4">
                      <p className="text-lg font-semibold text-gray-800 truncate">
                        {product.title}
                      </p>
                      <p className="text-red-600 font-bold text-lg mt-1">
                        {product.price.toLocaleString("en-US")} VND
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-500 mt-3">
                        <p className="flex items-center gap-1">
                          <i className="fa fa-calendar text-blue-400"></i>
                          <span>{product.date}</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <i className="fa fa-box text-green-400"></i>
                          <span>Số lượng: {product.cnt || 1}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
