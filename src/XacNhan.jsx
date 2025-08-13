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
      <div className=" shadow-2xl border-1 border-gray-300 bg-white fixed top-[72px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px]">
        <p className=" ml-2 mr-2 text-2xl font-semibold p-6  border-b-2 border-gray-400">
          Xác nhận đơn hàng
              </p>
              
        
        <button
          onClick={() => {
            localStorage.removeItem("product");
            navigate(-1);
          }}
          className=" absolute bottom-12 left-1/2 -translate-1/2 bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-4 py-2 rounded-md"
        >
          Quay lại
        </button>
      </div>
    </>
  );
}
