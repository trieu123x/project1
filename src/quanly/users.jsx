import { li } from "framer-motion/client";
import React, { useEffect, useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
export default function Users({ users }) {
  const [info, setInfo] = useState(null);
  const [showLichSu, setShowLichSu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);
  const handleSearch = () => {
    const result = users.filter((u) => {
      if (!keyword) return true;
      const value = u[filterBy]?.toLowerCase();
      return value?.includes(keyword.toLowerCase());
    });
    setFilteredUsers(result);
  };

  const totalPrice = useMemo(() => {
    if (!info || !info.order) return 0;
    return info.order.reduce((s, p) => {
      const q = p.cnt || 1;
      return s + p.price * q;
    }, 0);
  }, [info]);
  return (
    <>
      <div className="mt-6 ml-6 mr-6 gap-6">
        <div className=" space-y-6">
          {/* Thanh nav */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-2xl px-6 py-4 flex flex-wrap items-center justify-around gap-4">
            {/* Logo hoặc tiêu đề */}
            <h1 className="text-white text-xl font-bold tracking-wide">
              Quản lý người dùng
            </h1>

            {/* Ô nhập tìm kiếm */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm người dùng..."
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-white focus:outline-none bg-white/90 shadow-sm"
              />
            </div>

            {/* Bộ lọc */}
            <div className="flex items-center gap-2">
              <Filter className="text-white" size={20} />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-white/30 rounded-lg px-3 py-2 bg-white/90 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              >
                <option value="name">Tên</option>
                <option value="email">Email</option>
                <option value="phone">SĐT</option>
              </select>
            </div>

            {/* Nút tìm */}
            <button
              onClick={handleSearch}
              className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Tìm
            </button>
          </div>

          {/* Danh sách user */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => {
                  setInfo(user);
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center"
              >
                <img
                  className="w-24 h-24 object-cover rounded-full border-4 border-blue-200 shadow-md mb-4 hover:scale-105 transition"
                  src={user.avt}
                  alt={user.name}
                />
                <p className="text-lg font-bold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>

                {user.role === "admin" ? (
                  <span className="mt-3 inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                    Admin
                  </span>
                ) : (
                  <span className="mt-3 inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                    Thành viên
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {info && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9999"></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-99999">
              <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl shadow-2xl ">
                {/* Avatar */}
                <div className="flex flex-row space-x-4">
                  <div className="flex flex-col space-y-4">
                    <div className=" p-4 rounded-2xl flex flex-col space-y-2 bg-gradient-to-br from-purple-200 to-purple-50 shadow-xl items-center text-center">
                      <img
                        className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-md mb-4 object-cover"
                        src={info.avt}
                        alt={info.name}
                      />
                      <h2 className="text-2xl font-bold text-gray-800">
                        {info.name}
                      </h2>
                      <div className="flex items-center gap-3 text-gray-700">
                        <i className="fa fa-money-bill text-green-500"></i>
                        <span className="font-semibold text-lg text-green-600">
                          Đã tiêu: {totalPrice.toLocaleString("en-US")} VND
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <i className="fa fa-user-shield text-blue-500"></i>
                        {info.role === "admin" ? (
                          <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            Admin
                          </span>
                        ) : (
                          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                            Thành viên
                          </span>
                        )}{" "}
                      </div>
                    </div>

                    {/* Thông tin khác */}
                    <div className="bg-white rounded-2xl max-h-[400px] shadow-lg p-6">
                      <p className="pb-3 mb-4 font-bold text-2xl border-b border-gray-200 text-gray-800">
                        Thông tin cá nhân
                      </p>

                      <div className="grid grid-cols-3 gap-y-4 text-gray-700">
                        <span className="font-semibold flex items-center gap-2">
                          <i className="fa fa-id-card text-blue-500"></i> ID:
                        </span>
                        <span className="col-span-2">{info.id}</span>

                        <span className="font-semibold flex items-center gap-2">
                          <i className="fa fa-user text-purple-500"></i> Tên:
                        </span>
                        <span className="col-span-2">{info.name}</span>

                        <span className="font-semibold flex items-center gap-2">
                          <i className="fa fa-envelope text-red-500"></i> Email:
                        </span>
                        <span className="col-span-2">{info.email}</span>

                        <span className="font-semibold flex items-center gap-2">
                          <i className="fa fa-phone text-green-500"></i> Số điện
                          thoại:
                        </span>
                        <span className="col-span-2">{info.phone}</span>

                        <span className="font-semibold flex items-center gap-2">
                          <i className="fa fa-home text-indigo-500"></i> Địa
                          chỉ:
                        </span>
                        <span className="col-span-2">{info.address}</span>

                        <span className="font-semibold flex items-center gap-2">
                          <i className="fa fa-align-left text-yellow-500"></i>{" "}
                          Mô tả:
                        </span>
                        <span className="overflow-y-auto col-span-2 italic text-gray-600 max-w-[240px] max-h-24 block whitespace-pre-wrap break-words">
                          {info.description || "Chưa có mô tả"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl shadow-lg p-6">
                    {/* Tiêu đề */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <i className="fa fa-shopping-bag text-blue-500"></i> Lịch
                      sử mua hàng
                    </h1>

                    {/* Danh sách sản phẩm */}
                    <div className="flex flex-col  overflow-auto max-h-[560px] pr-2">
                      <ul className="space-y-4">
                        {info.order.map((product, index) => (
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
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Nút đóng */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setInfo(null)}
                    className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow"
                  >
                    Đóng
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
