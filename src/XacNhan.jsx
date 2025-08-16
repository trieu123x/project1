import React, { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function Thanhtoan() {
    const navigate = useNavigate();
    const location = useLocation();
    const {product} = location.state || {};
  console.log(product)
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
  <div className="shadow-2xl border border-gray-200 bg-white rounded-2xl p-8 w-[90%] max-w-xl text-center">
   
    <div className="flex justify-center mb-4">
      <i className="fa fa-ambulance text-5xl text-emerald-500" aria-hidden="true"></i>
    </div>

   
    <h2 className="text-2xl font-bold text-gray-800 mb-2">
      Đặt hàng thành công!
    </h2>
    <p className="text-gray-600 mb-6">
      Đơn hàng của bạn sẽ được <span className="font-semibold text-emerald-600">ship đến trong 24h</span>.
    </p>

    
    <button
      onClick={() => navigate("/")}
      className="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-auto"
    >
      Tiếp tục mua sắm
    </button>
  </div>
</div>

    </>
  );
}
