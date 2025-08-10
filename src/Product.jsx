import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Thanhtoan from "./Thanhtoan";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

function Product({ products, onAddProduct }) {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const navigate = useNavigate();
  const add = () => {
    onAddProduct(prod);
  };
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProd(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {prod && (
        <><div className=" rounded-md drop-shadow-2xl border border-gray-300 space-x-4 mx-auto mt-12 flex w-[1000px] h-[500px]">
          <img
            className=" object-contain min-w-[400px] rounded-l-md bg-gray-400"
            src={prod.image}
            alt=""
          />
          <div className=" mt-4 flex flex-col space-y-4">
            <p className="text-4xl">{prod.title}</p>
            <div className=" pl-1.5 pr-1.5 flex w-[200px] flex-row space-x-2">
              <p className="pl-1 pr-1 text-sm rounded-sm border border-amber-400 bg-amber-200">
                {prod.rating.rate}{" "}
                <i className="text-amber-500 fa-solid fa-star"></i>
              </p>
              <p>Đã bán {prod.rating.count}</p>
            </div>
            <p>Mô tả: {prod.description}</p>
            <div className="mr-4 bg-gray-300 p-4 flex space-x-4 items-center">
              <p className="text-2xl font-semibold" >Giá chỉ:</p>
              <p className="text-2xl font-semibold text-red-600">
                {prod.price}$
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={add}
                className="cursor-pointer bg-emerald-200 border-2 font-semibold border-emerald-600 px-4 py-2  hover:bg-emerald-600 transition-colors duration-300"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("product", JSON.stringify(prod));
                  navigate("/thanhtoan")
                }}
                className=" cursor-pointer bg-emerald-500 px-4 py-2 font-semibold hover:bg-emerald-600 transition-colors duration-300"
              >
                Mua ngay
              </button>
           </div>
          </div>
        </div>
          
        </>
      )}
      
    </div>
  );
}

export default Product;
