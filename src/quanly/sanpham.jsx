import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";
import React, { use, useEffect, useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";
import { li } from "framer-motion/client";

export default function Sanpham({ products, fetchProducts }) {
  const [quanaonam, setQuanaonam] = useState(true);
  const [quanaonu, setQuanaonu] = useState(true);
  const [dienmay, setDienmay] = useState(true);
  const [trangsuc, setTrangSuc] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [err, setErr] = useState(false);
  const [tb, setTb] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showDM, setShowDM] = useState(false);
  const [prod, setProd] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: null,
    description: "",
    image: "",
    rate: null,
    count: null,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "price" || name === "rate" || name == "count"
          ? Number(value)
          : value,
    });
  };
  const handleAdd = async () => {
    try {
      const res = await fetch(
        `https://68a1ffce6f8c17b8f5db45c7.mockapi.io/product`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      setTb("Thêm sản phẩm thành công");
      setTimeout(() => {
        setTb(null);
      }, 3000);
      fetchProducts();
      setForm({
        title: "",
        price: "",
        description: "",
        image: "",
        rate: "",
        count: "",
        category: "",
      });
    } catch (loi) {
      setErr(`Thất bại ${loi}`);
      setTimeout(() => setErr(false), 3000);
    }
  };
  const toggleSelect = (pr) => {
    if (selected.find((p) => p.id === pr.id)) {
      setSelected(selected.filter((x) => x.id !== pr.id));
    } else {
      setSelected([...selected, pr]);
    }
  };
  const deleteProduct = async (prs) => {
    for (const pr of prs) {
      try {
        await Promise.all(
          prs.map((pr) =>
            fetch(
              `https://68a1ffce6f8c17b8f5db45c7.mockapi.io/product/${pr.id}`,
              {
                method: "DELETE",
              }
            )
          )
        );
        fetchProducts();
        setSelected([]);
        setTb("Xóa sản phẩm thành công");
        setTimeout(() => {
          setTb(null);
        }, 3000);
        setShowDelete(false);
      } catch (err) {
        setErr(`Lỗi ${err}`);
        setTimeout(() => {
          setErr(null);
        }, 3000);
      }
    }
  };
  const handleSave = async (p) => {
    try {
      const res = await fetch(
        `https://68a1ffce6f8c17b8f5db45c7.mockapi.io/product/${p.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      setTb("Cập nhật thông tin sản phẩm thành công");
      setTimeout(() => {
        setTb(null);
      }, 3000);
      fetchProducts();
      setProd(data);
      setEdit(null);
      setShowAdd(false);
      setForm({
        title: "",
        price: null,
        description: "",
        image: "",
        rate: null,
        count: null,
        category: "",
      });
    } catch (loi) {
      setErr(`Thất bại ${loi}`);
      setTimeout(() => setErr(false), 3000);
    }
  };
  return (
    <>
      {err && (
        <motion.div
          initial={{ y: -50, opacity: 0 }} // bắt đầu cao hơn và mờ
          animate={{ y: 0, opacity: 1 }} // trượt xuống và hiện rõ
          transition={{ duration: 0.4, ease: "easeOut" }} // thời gian và easing
          className="fixed z-999 top-12 bg-red-100 text-red-600 p-3 mb-4 rounded-lg text-center font-medium shadow-lg w-fit mx-auto left-1/2 -translate-x-1/2"
        >
          {err}
        </motion.div>
      )}
      {tb && (
        <motion.div
          initial={{ y: -50, opacity: 0 }} // bắt đầu cao hơn và mờ
          animate={{ y: 0, opacity: 1 }} // trượt xuống và hiện rõ
          transition={{ duration: 0.4, ease: "easeOut" }} // thời gian và easing
          className="fixed z-999 top-12 bg-green-100 text-green-600 p-3 mb-4 rounded-lg text-center font-medium shadow-lg w-fit mx-auto left-1/2 -translate-x-1/2"
        >
          {tb}
        </motion.div>
      )}
      {deleteMode && (
        <div>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-12 z-50 bg-gray-200 p-4 rounded-lg text-center font-medium shadow-lg w-fit mx-auto left-1/2 -translate-x-1/2"
          >
            <p className="p-2 text-red-600">Chọn các sản phẩm bạn muốn xóa</p>
            <div className="flex flex-row justify-center gap-4 p-2">
              <button
                onClick={() => {
                  setDeleteMode(!deleteMode);
                  setSelected([]);
                }}
                className="px-4 py-2 rounded-lg border border-gray-400 bg-white text-gray-700 hover:bg-gray-100 hover:shadow transition"
              >
                Quay lại
              </button>
              <button
                onClick={() => {
                  {
                    if (selected.length == 0) {
                      setErr("Bạn cần chọn ít nhất 1 sản phẩm");
                      setTimeout(() => {
                        setErr(null);
                      }, 3000);
                      return;
                    }
                  }
                  setShowDelete(true);
                  setDeleteMode(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:shadow transition"
              >
                Tiếp tục
              </button>
            </div>
            {err && (
              <>
                <p>Bạn cần chọn ít nhất 1 sản phẩm</p>
              </>
            )}
          </motion.div>
        </div>
      )}
      <div className="flex flex-col  mt-4 ml-4 mr-4 gap-6">
        <div className="w-full h-[60px] flex flex-row items-center justify-start gap-4 px-4 bg-gradient-to-r from-purple-300 to-white shadow-md rounded-b-2xl">
          {/* Nút xóa sản phẩm */}
          <button
            onClick={() => {
              setDeleteMode(!deleteMode);
              setSelected([]);
            }}
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium shadow hover:bg-red-600 hover:shadow-lg transition"
          >
            <i className="fa fa-trash mr-2"></i>
            Xóa sản phẩm
          </button>

          {/* Nút danh mục sản phẩm */}
          <button
            onClick={() => {
              setShowDM(!showDM);
            }}
            className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium shadow hover:bg-blue-600 hover:shadow-lg transition relative"
          >
            <i className="fa fa-list mr-2"></i>
            Danh mục sản phẩm
            {showDM && (
              <div className="absolute z-50 top-full left-0 mt-2 bg-white w-56 rounded-xl shadow-xl text-gray-800 border border-gray-200">
                <ul className="space-y-1 py-2">
                  <li>
                    <a
                      onClick={() => {
                        setQuanaonam(true);
                        setQuanaonu(true);
                        setDienmay(true);
                        setTrangSuc(true);
                      }}
                      className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
                    >
                      <i className="fa fa-list text-blue-500"></i>
                      Tất Cả Sản Phẩm
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setDienmay(false);
                        setTrangSuc(true);
                        setQuanaonam(false);
                        setQuanaonu(false);
                      }}
                      className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-pink-100 hover:text-pink-700 transition"
                    >
                      <i className="fa fa-gem text-pink-500"></i>
                      Trang Sức
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setTrangSuc(false);
                        setDienmay(true);
                        setQuanaonam(false);
                        setQuanaonu(false);
                      }}
                      className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition"
                    >
                      <i className="fa fa-tv text-purple-500"></i>
                      Điện Tử
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setDienmay(false);
                        setTrangSuc(false);
                        setQuanaonam(true);
                        setQuanaonu(false);
                      }}
                      className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
                    >
                      <i className="fa fa-male text-green-500"></i>
                      Quần áo nam
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setDienmay(false);
                        setTrangSuc(false);
                        setQuanaonam(false);
                        setQuanaonu(true);
                      }}
                      className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-red-100 hover:text-red-700 transition"
                    >
                      <i className="fa fa-female text-red-500"></i>
                      Quần áo nữ
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>

        {showDelete && (
          <>
            {/* Lớp nền mờ */}
            <div className="fixed inset-0 bg-black opacity-40 z-40"></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 space-y-6 flex flex-col rounded-2xl shadow-2xl w-[800px]">
                {/* Tiêu đề */}
                <h2 className="text-2xl font-bold text-center text-gray-800">
                  Danh sách sản phẩm bạn muốn xóa
                </h2>

                {/* Danh sách sản phẩm */}
                <ul className="max-h-[500px] overflow-auto space-y-4 pr-2">
                  {selected.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border hover:shadow-md transition"
                    >
                      <img
                        className="w-20 h-20 object-cover rounded-lg border"
                        src={p.image}
                        alt={p.title}
                      />
                      <div className="flex flex-col flex-1">
                        <p className="font-semibold text-lg text-gray-800">
                          {p.title}
                        </p>
                        <p className="text-gray-500">{p.price} ₫</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Nút hành động */}
                <div className="flex flex-row justify-center gap-6 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowDelete(false);
                      setSelected([]);
                    }}
                    className="px-6 py-2 rounded-lg border border-gray-400 bg-white text-gray-700 font-medium hover:bg-gray-100 hover:shadow transition"
                  >
                    Quay lại
                  </button>

                  <button
                    onClick={() => {
                      deleteProduct(selected);
                    }}
                    className="px-6 py-2 rounded-lg font-bold bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition"
                  >
                    XÓA
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {showAdd && (
          <>
            {/* Lớp nền mờ */}
            <div className="fixed inset-0 bg-black opacity-40 z-40"></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 space-y-4 flex flex-col rounded-2xl shadow-2xl w-[800px]">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                  Thêm sản phẩm mới
                </h2>

                <div className="flex flex-row w-full justify-around items-start space-x-6">
                  {/* preview ảnh sản phẩm */}
                  <div className="relative">
                    <div
                      className="h-60 w-48 bg-slate-100 overflow-hidden rounded-xl ring-2 ring-blue-400 shadow-md cursor-pointer hover:scale-105 hover:ring-blue-500 transition"
                      title="Chọn ảnh đại diện"
                    >
                      {form.image ? (
                        <img
                          src={form.image}
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

                  {/* Thông tin sản phẩm */}
                  <div className="flex flex-col flex-1 space-y-3">
                    {/* Tên sản phẩm */}
                    <div>
                      <label className="block font-semibold mb-1">
                        Tên sản phẩm
                      </label>
                      <input
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        value={form.title}
                        name="title"
                        onChange={handleChange}
                        placeholder="Nhập tên sản phẩm..."
                      />
                    </div>

                    {/* Giá tiền & Category */}
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <label className="block font-semibold mb-1">
                          Giá tiền
                        </label>
                        <input
                          className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          type="number"
                          value={form.price}
                          name="price"
                          onChange={handleChange}
                          placeholder="Giá tiền..."
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-semibold mb-1">
                          Category
                        </label>
                        <div className="relative">
                          <select
                            className="appearance-none border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 cursor-pointer"
                            value={form.category}
                            name="category"
                            onChange={handleChange}
                          >
                            <option value="">-- Chọn loại --</option>
                            <option value="trang sức">Trang sức</option>
                            <option value="quần áo nam">Quần áo nam</option>
                            <option value="quần áo nữ">Quần áo nữ</option>
                            <option value="đồ điện tử">Đồ điện tử</option>
                          </select>
                          {/* icon mũi tên */}
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                            <i className="fa fa-chevron-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Đánh giá & Số lượng */}
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <label className="block font-semibold mb-1">
                          Đánh giá
                        </label>
                        <input
                          className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          type="number"
                          value={form.rate}
                          name="rate"
                          onChange={handleChange}
                          placeholder="Đánh giá..."
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-semibold mb-1">
                          Số lượng
                        </label>
                        <input
                          className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          type="number"
                          value={form.count}
                          name="count"
                          onChange={handleChange}
                          placeholder="Số lượng..."
                        />
                      </div>
                    </div>

                    {/* Link ảnh */}
                    <div>
                      <label className="block font-semibold mb-1">
                        Link ảnh sản phẩm
                      </label>
                      <input
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        value={form.image}
                        name="image"
                        onChange={handleChange}
                        placeholder="Nhập link ảnh sản phẩm..."
                      />
                    </div>

                    {/* Mô tả */}
                    <div>
                      <label className="block font-semibold mb-1">Mô tả</label>
                      <textarea
                        className="border border-gray-300 rounded-xl p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Nhập mô tả sản phẩm..."
                      />
                    </div>
                  </div>
                </div>

                {/* them san pham */}
                {edit == null && (
                  <>
                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        onClick={() => setShowAdd(false)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-md transition"
                      >
                        Đóng
                      </button>
                      <button
                        onClick={() => {
                          if (
                            !form.title ||
                            !form.category ||
                            !form.count ||
                            !form.description ||
                            !form.image ||
                            !form.price ||
                            !form.rate
                          ) {
                            setErr("Bạn cần nhập hết thông tin sản phẩm");
                            setTimeout(() => {
                              setErr(null);
                            }, 3000);
                            return;
                          }
                          handleAdd();
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-md transition"
                      >
                        Thêm sản phẩm
                      </button>
                    </div>
                  </>
                )}
                {/* chinh sua san pham */}
                {edit && (
                  <>
                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        onClick={() => {
                          setShowAdd(false);
                          setForm({
                            title: "",
                            price: null,
                            description: "",
                            image: "",
                            rate: null,
                            count: null,
                            category: "",
                          });
                          setProd(edit)
                          setEdit(null)
                        }}
                        className="font-semibold bg-gray-200 hover:bg-gray-300  px-5 py-2 rounded-xl shadow-md transition"
                      >
                        Quay Lại
                      </button>
                      <button
                        onClick={() => {
                          if (
                            !form.title ||
                            !form.category ||
                            !form.count ||
                            !form.description ||
                            !form.image ||
                            !form.price ||
                            !form.rate
                          ) {
                            setErr("Bạn cần nhập hết thông tin sản phẩm");
                            setTimeout(() => {
                              setErr(null);
                            }, 3000);
                            return;
                          }
                          handleSave(edit);
                        }}
                        className="font-semibold bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-md transition"
                      >
                        Lưu
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        {prod && (
          <>
            <div className="fixed inset-0 bg-black opacity-40 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="max-w-6xl mx-auto mt-12 rounded-lg overflow-hidden shadow-2xl border border-gray-200 bg-white flex flex-col md:flex-row">
                <div className="bg-gray-100 flex justify-center items-center p-4 md:min-w-[400px]">
                  <img
                    className="object-contain w-full max-w-[400px] h-auto rounded-md"
                    src={prod.image}
                    alt={prod.title}
                  />
                </div>

                <div className="flex flex-col justify-between p-6 space-y-6 flex-1">
                  <p className="text-3xl font-bold text-gray-800">
                    {prod.title}
                  </p>

                  <div className="flex items-center space-x-4">
                    <p className="px-2 py-1 text-sm rounded-sm border border-amber-400 bg-amber-100 flex items-center">
                      {prod.rate}{" "}
                      <i className="text-amber-500 fa-solid fa-star ml-1"></i>
                    </p>
                    <p className="text-gray-600">Đã bán {prod.count}</p>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="bg-gray-100 p-4 rounded-md flex items-center space-x-3">
                    <p className="text-xl font-semibold text-gray-800">
                      Giá chỉ:
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {prod.price.toLocaleString("en-US")} VND
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        deleteProduct([prod]);
                        setProd(null);
                      }}
                      className="px-4 py-2 rounded-md bg-red-500 text-white font-medium shadow hover:bg-red-600 hover:shadow-lg transition"
                    >
                      <i className="fa fa-trash mr-2"></i>
                      Xóa sản phẩm
                    </button>
                    <button
                      onClick={() => {
                        setForm(prod);
                        setShowAdd(true);
                        setEdit(prod);
                        setProd(null);
                      }}
                      className="flex-1 min-w-[140px] bg-emerald-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300"
                    >
                      Chỉnh sửa
                    </button>
                  </div>

                  <button
                    onClick={() => setProd(null)}
                    className="self-end mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col lg:flex-row gap-6">
          <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* them sản phẩm */}
            <div
              onClick={() => setShowAdd(true)}
              className="cursor-pointer h-[360px] duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4 bg-white shadow-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </div>
              <p className="text-lg font-medium text-gray-700">Thêm sản phẩm</p>
            </div>
            {products.map((product) => {
              const category = product.category;

              if (
                (category === "quần áo nam" && !quanaonam) ||
                (category === "quần áo nữ" && !quanaonu) ||
                (category === "đồ điện tử" && !dienmay) ||
                (category === "trang sức" && !trangsuc)
              ) {
                return null;
              }

              return (
                <li
                  onClick={() => {
                    setProd(product);
                  }}
                  key={product.id}
                >
                  <div className="cursor-pointer h-[360px] duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 rounded-2xl flex flex-col bg-white shadow-sm relative">
                    {/* Checkbox custom */}
                    {deleteMode && (
                      <label className="absolute top-3 right-3">
                        <input
                          type="checkbox"
                          checked={selected.some((p) => p.id == product.id)}
                          onChange={() => toggleSelect(product)}
                          className="peer hidden"
                        />
                        <div className="w-6 h-6 flex items-center justify-center rounded-md border-2 border-gray-400 bg-white peer-checked:bg-red-500 peer-checked:border-red-500 transition">
                          <i className="fa-solid fa-check text-white text-xs"></i>
                        </div>
                      </label>
                    )}

                    <img
                      className="bg-gray-100 rounded-t-2xl object-contain w-full h-[200px] p-4"
                      src={product.image}
                      alt={product.title}
                    />

                    <div className="flex flex-col flex-1 p-3 space-y-2">
                      <p className="line-clamp-2 font-medium text-gray-800">
                        {product.title}
                      </p>
                      <p className="font-bold text-red-600 text-lg">
                        {product.price.toLocaleString("en-US")} VND
                      </p>
                      <div className="mt-auto flex items-center space-x-2">
                        <p className="px-2 py-0.5 text-sm rounded-md border border-amber-400 bg-amber-100">
                          {product.rate}{" "}
                          <i className="text-amber-500 fa-solid fa-star"></i>
                        </p>
                        <p className="text-sm text-gray-600">
                          Đã bán {product.count}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
