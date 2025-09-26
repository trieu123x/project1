import React, { useEffect, useState } from "react";
import "./App.css";
import Giohang from "./Giohang";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
function Danhmucsp({ products }) {
  const [quanaonam, setQuanaonam] = useState(true);
  const [quanaonu, setQuanaonu] = useState(true);
  const [dienmay, setDienmay] = useState(true);
  const [trangsuc, setTrangSuc] = useState(true);
  const [random, setRandom] = useState(0);
  const [prod, setProd] = useState(products);
  const location = useLocation();
  useEffect(() => {
    setProd(products);
  }, [products]);
  useEffect(() => {
    if (location.state?.category == "Quần áo nam") {
      setDienmay(false);
      setTrangSuc(false);
      setQuanaonam(true);
      setQuanaonu(false);
    } else if (location.state?.category == "Quần áo nữ") {
      setDienmay(false);
      setTrangSuc(false);
      setQuanaonam(false);
      setQuanaonu(true);
    } else if (location.state?.category == "Điện Tử") {
      setDienmay(true);
      setTrangSuc(false);
      setQuanaonam(false);
      setQuanaonu(false);
    } else if (location.state?.category == "Trang Sức") {
      setDienmay(false);
      setTrangSuc(true);
      setQuanaonam(false);
      setQuanaonu(false);
    }
  }, []);

  // random sp
  useEffect(() => {
    if (products.length > 0) {
      setRandom(Math.floor(Math.random() * products.length));
      const interval = setInterval(() => {
        setRandom(Math.floor(Math.random() * products.length));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [products]);

  const handleSortDown = () => {
    const sorted = [...prod].sort((a, b) => {
      return a.price - b.price;
    });
    setProd(sorted);
  };
  const handleSortUp = () => {
    const sorted = [...prod].sort((a, b) => {
      return b.price - a.price;
    });
    setProd(sorted);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col lg:flex-row mt-4 ml-4 gap-6">
        <div className="w-full space-y-4 lg:w-[280px] border border-gray-200  bg-white shadow-md rounded-2xl p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Danh mục sản phẩm
          </h1>
          <ul className="space-y-2">
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
                <i className="fa fa-list text-blue-500" aria-hidden="true"></i>
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
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
              >
                <i className="fa fa-gem text-pink-500" aria-hidden="true"></i>
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
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
              >
                <i className="fa fa-tv text-purple-500" aria-hidden="true"></i>
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
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
              >
                <i className="fa fa-male text-green-500" aria-hidden="true"></i>
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
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
              >
                <i className="fa fa-female text-red-500" aria-hidden="true"></i>
                Quần áo nữ
              </a>
            </li>
          </ul>
          <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Sắp xếp theo giá
          </h1>
          <div className="flex p-2 flex-col gap-4 mt-4">
            {/* Nút tăng */}
            <button
              onClick={handleSortUp}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 
               text-white font-semibold rounded-xl shadow-lg 
               hover:from-green-500 hover:to-green-700 
               transition-all duration-200 transform hover:-translate-y-1"
            >
              <i className="fas fa-arrow-up"></i>
              Tăng
            </button>

            {/* Nút giảm */}
            <button
              onClick={handleSortDown}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 
               text-white font-semibold rounded-xl shadow-lg 
               hover:from-red-500 hover:to-red-700 
               transition-all duration-200 transform hover:translate-y-1"
            >
              <i className="fas fa-arrow-down"></i>
              Giảm
            </button>
            <button
              onClick={()=>setProd(products)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-600 
               text-white font-semibold rounded-xl shadow-lg 
               hover:from-gray-500 hover:to-gray-700 
               transition-all duration-200 transform hover:scale-105"
            >

              Không sắp xếp
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6">
          <ul className="flex-1 max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {prod.map((product) => {
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
                <li key={product.id}>
                  <div
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                    }}
                    className="cursor-pointer h-[360px] duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 rounded-2xl flex flex-col bg-white shadow-sm"
                  >
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

          {products.length > 0 && (
            <div className="w-full p-4 lg:w-[300px]">
              <h2 className="text-lg font-bold mb-4">🌟 Sản phẩm nổi bật</h2>
              <div
                onClick={() => {
                  navigate(`/product/${products[random].id}`);
                }}
                className="cursor-pointer duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 rounded-2xl flex flex-col bg-white shadow-sm"
              >
                <img
                  className="bg-gray-100 rounded-t-2xl object-contain w-full h-[200px] p-4"
                  src={products[random].image}
                  alt={products[random].title}
                />
                <div className="flex flex-col flex-1 p-3 space-y-2">
                  <p className="line-clamp-2 font-medium text-gray-800">
                    {products[random].title}
                  </p>
                  <p className="font-bold text-red-600 text-lg">
                    {products[random].price} VND
                  </p>
                  <div className="mt-auto flex items-center space-x-2">
                    <p className="px-2 py-0.5 text-sm rounded-md border border-amber-400 bg-amber-100">
                      {products[random].rate}{" "}
                      <i className="text-amber-500 fa-solid fa-star"></i>
                    </p>
                    <p className="text-sm text-gray-600">
                      Đã bán {products[random].count}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Danhmucsp;
