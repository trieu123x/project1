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
      
        <div className="shadow-2xl border border-gray-200 bg-white mx-auto mt-8 p-6 rounded-xl 
                max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
  <p className="text-2xl font-semibold border-b border-gray-300 pb-4 mb-6 text-center">
    Chọn phương thức thanh toán
  </p>

  <div className="space-y-4">
    <div 
      onClick={() => navigate("/ptthanhtoan/thetindung")}
      className="flex items-center text-lg sm:text-xl p-4 border rounded-lg cursor-pointer 
                 hover:bg-gray-100 transition shadow-sm hover:shadow-md"
    >
      <i className="text-3xl sm:text-4xl fa-solid fa-credit-card mr-4 text-emerald-600"></i>
      <span>Thanh toán bằng thẻ tín dụng</span>
    </div>

    <div 
      onClick={() => navigate("/ptthanhtoan/paypal")}
      className="flex items-center text-lg sm:text-xl p-4 border rounded-lg cursor-pointer 
                 hover:bg-gray-100 transition shadow-sm hover:shadow-md"
    >
      <i className="text-3xl sm:text-4xl fa-brands fa-cc-paypal mr-4 text-blue-600"></i>
      <span>Thanh toán qua PayPal</span>
    </div>

    <div 
      onClick={() => navigate("/ptthanhtoan/nhanhang")}
      className="flex items-center text-lg sm:text-xl p-4 border rounded-lg cursor-pointer 
                 hover:bg-gray-100 transition shadow-sm hover:shadow-md"
    >
      <i className="text-3xl sm:text-4xl fa-solid fa-money-bill mr-4 text-green-600"></i>
      <span>Thanh toán khi nhận hàng</span>
    </div>
  </div>

  <div className="mt-6 text-center">
    <button
      onClick={() => {
        localStorage.removeItem("product");
        navigate(-1);
      }}
      className="bg-gray-200 hover:bg-gray-300 transition-colors duration-300 
                 text-gray-700 font-semibold px-6 py-2 rounded-md"
    >
      Quay lại
    </button>
  </div>
</div>

      
    </>
  );
}
