import React, { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";


export default function Thanhtoan() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("product")
    if(stored) setProduct(JSON.parse(stored))
  },[])
  return (
    <>
      
        <div className=" shadow-2xl border-1 border-gray-300 bg-white fixed top-[72px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px]">
          <p className=" ml-2 mr-2 text-2xl font-semibold p-6  border-b-2 border-gray-400">
            Chọn phương thức thanh toán
          </p>
          <div className=" flex flex-col space-y-4 p-6">
            <ul className=" space-y-6">
              <li onClick={() => navigate("/ptthanhtoan/thetindung")} className="flex items-center text-xl  cursor-pointer hover:bg-gray-300 p-2 rounded-md">
              <i
                  className="text-4xl fa-solid fa-credit-card mr-2"
                  aria-hidden="true"
                ></i>
                Thanh toán bằng thẻ tín dụng
              </li>
              <li className="text-xl flex items-center cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                <i
                  className=" text-4xl fa-brands fa-cc-paypal mr-2"
                  aria-hidden="true"
                ></i>
                Thanh toán qua PayPal
              </li>
              <li className=" text-xl flex items-center cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                <i
                  className="text-4xl fa-solid fa-money-bill mr-2"
                  aria-hidden="true"
                ></i>
                Thanh toán khi nhận hàng
            </li>
            </ul>
        </div>
        <button
          onClick={
            () => {
              localStorage.removeItem("product");
              navigate(-1);
            }
          }
        className=" absolute bottom-12 left-1/2 -translate-1/2 bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-4 py-2 rounded-md">
          Quay lại
        </button>
        </div>
      
    </>
  );
}
