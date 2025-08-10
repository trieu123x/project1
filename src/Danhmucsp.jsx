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

function Danhmucsp() {
  const [quanaonam, setQuanaonam] = useState(true);
  const [quanaonu, setQuanaonu] = useState(true);
  const [dienmay, setDienmay] = useState(true);
  const [trangsuc, setTrangSuc] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className=" flex mt-4 ml-4">
        <div className="w-[300px] mr- border-r-2 border-gray-400">
          <h1 className=" text-2xl font-bold ">Danh mục sản phẩm</h1>
          <ul>
            <li>
              <a
                onClick={() => {
                  setQuanaonam(true);
                  setQuanaonu(true);
                  setDienmay(true);
                  setTrangSuc(true);
                }}
                className="cursor-pointer block pl-4 pr-4 py-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <i class="fa fa-list" aria-hidden="true"></i> Tất Cả Sản Phẩm
              </a>
              <a
                onClick={() => {
                  setDienmay(false);
                  setTrangSuc(true);
                  setQuanaonam(false);
                  setQuanaonu(false);
                }}
                className="cursor-pointer block pl-4 pr-4 py-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <i class="fa fa-list" aria-hidden="true"></i> Trang Sức
              </a>
              <a
                onClick={() => {
                  setTrangSuc(false);
                  setDienmay(true);
                  setQuanaonam(false);
                  setQuanaonu(false);
                }}
                className="cursor-pointer block pl-4 pr-4 py-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <i class="fa fa-list" aria-hidden="true"></i> Điện Từ
              </a>
              <a
                onClick={() => {
                  setDienmay(false);
                  setTrangSuc(false);
                  setQuanaonam(true);
                  setQuanaonu(false);
                }}
                className="cursor-pointer block pl-4 pr-4 py-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <i class="fa fa-list" aria-hidden="true"></i> Quần áo nam
              </a>
              <a
                onClick={() => {
                  setDienmay(false);
                  setTrangSuc(false);
                  setQuanaonam(false);
                  setQuanaonu(true);
                }}
                className="cursor-pointer block pl-4 pr-4 py-2 hover:bg-gray-200 transition-colors duration-300"
              >
                <i class="fa fa-list" aria-hidden="true"></i> Quần áo nữ
              </a>
            </li>
          </ul>
        </div>
        <ul className=" ml-6 w-[800px] flex flex-wrap gap-4">
          {products.map((product) => {
            const category = product.category;

            if (
              (category === "men's clothing" && !quanaonam) ||
              (category === "women's clothing" && !quanaonu) ||
              (category === "electronics" && !dienmay) ||
              (category === "jewelery" && !trangsuc)
            ) {
              return;
            }

            return (
              <li key={product.id}>
                <div
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                  }}
                  className="cursor-pointer duration-300 ease-in-out hover:shadow-2xl hover:scale-105 space-y-2 border border-gray-400 rounded-md flex flex-col w-[200px] h-[300px]"
                >
                  <img
                    className="bg-gray-400 rounded-t-md object-contain w-[200px] h-[150px]"
                    src={product.image}
                    alt=""
                  />
                  <p className="pl-1.5 pr-1.5 line-clamp-2">{product.title}</p>
                  <p className=" font-semibold text-red-600 text-2xl pl-1.5 pr-1.5">
                    {product.price}$
                  </p>
                  <div className="mb-3 mt-auto pl-1.5 pr-1.5 flex w-[200px] flex-row space-x-2">
                    <p className="pl-1 pr-1 text-sm rounded-sm border border-amber-400 bg-amber-200">
                      {product.rating.rate}{" "}
                      <i className="text-amber-500 fa-solid fa-star"></i>
                    </p>
                    <p>Đã bán {product.rating.count}</p>
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
