import React, { use, useEffect, useState } from "react";
import "./App.css";
import Giohang from "./Giohang";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Danhmucsp({products}) {
  const [quanaonam, setQuanaonam] = useState(true);
  const [quanaonu, setQuanaonu] = useState(true);
  const [dienmay, setDienmay] = useState(true);
  const [trangsuc, setTrangSuc] = useState(true);
  
  const navigate = useNavigate();
  

  return (
    <>
      <div className=" flex mt-4 ml-4">
        <div className="w-[300px] border-r border-gray-300 bg-white shadow-md rounded-lg p-4">
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
        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
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
        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
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
        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
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
        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
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
        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
      >
        <i className="fa fa-female text-red-500" aria-hidden="true"></i>
        Quần áo nữ
      </a>
    </li>
  </ul>
</div>

        <ul className="ml-6 w-[800px] flex flex-wrap gap-6">
  {products.map((product) => {
    const category = product.category;

    if (
      (category === "men's clothing" && !quanaonam) ||
      (category === "women's clothing" && !quanaonu) ||
      (category === "electronics" && !dienmay) ||
      (category === "jewelery" && !trangsuc)
    ) {
      return null;
    }

    return (
      <li key={product.id}>
        <div
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
          className="cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:scale-105 border border-gray-200 rounded-xl flex flex-col w-[220px] h-[340px] bg-white shadow-sm"
        >
          <img
            className="bg-gray-100 rounded-t-xl object-contain w-full h-[180px] p-4"
            src={product.image}
            alt={product.title}
          />
          <div className="flex flex-col flex-1 p-3 space-y-2">
            <p className="line-clamp-2 font-medium text-gray-800">
              {product.title}
            </p>
            <p className="font-bold text-red-600 text-xl">
              {product.price}$
            </p>
            <div className="mt-auto flex items-center space-x-2">
              <p className="px-2 py-0.5 text-sm rounded-sm border border-amber-400 bg-amber-200">
                {product.rating.rate}{" "}
                <i className="text-amber-500 fa-solid fa-star"></i>
              </p>
              <p className="text-sm text-gray-600">
                Đã bán {product.rating.count}
              </p>
            </div>
          </div>
        </div>
      </li>
    );
  })}
</ul>

      </div>
    </>
  );
}

export default Danhmucsp;
