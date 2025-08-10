import React, { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function Thetindung() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("product");
    if (stored) setProduct(JSON.parse(stored));
  }, []);
  return (
    <>
      <div className=" shadow-2xl border-1 border-gray-300 bg-white fixed top-[72px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px]">
        <p className=" ml-2 mr-2 text-2xl font-semibold p-6  border-b-2 border-gray-400">
          <i
            className="text-4xl fa-solid fa-credit-card mr-2"
            aria-hidden="true"
          ></i>{" "}
          Thanh toán bằng thẻ tín dụng
        </p>
        <div className=" flex flex-row justify-between space-x-8 p-6">
          <div className="w-1/2">
            <p className="text-lg font-semibold">Thông tin thẻ tín dụng</p>
            <form className="space-y-4">
              <input
                type="number"
                placeholder="Số thẻ"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Họ và tên chủ thẻ"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                placeholder="Ngày hết hạn (MM/YY)"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Mã CVV"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </form>
          </div>
          <div className="w-1/2">
            <p className="text-lg font-semibold">Địa chỉ</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Thành phố"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Quân/huyện"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Xa/phường"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Địa chỉ chi tiết"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </form>
          </div>
        </div>
        <div className="p-6 w-1/3">
          <p className="text-lg font-semibold">Số Điện Thoại</p>
          <input
            type="num
                ber"
            placeholder="Số Điện Thoại"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex  justify-around p-6">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className=" bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-4 py-2 rounded-md"
          >
            Quay lại
          </button>
          <button className="  bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-4 py-2 rounded-md">
            Tiếp tục
          </button>
        </div>
      </div>
    </>
  );
}
