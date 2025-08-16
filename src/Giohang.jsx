import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";


export default function Giohang({ products, show }) {
  const [visible, setVisible] = useState(false);
  
  const navigate = useNavigate();
  
  const totalPrice = useMemo(() => {
    return products.reduce((sum,product)=> sum + product.price,0)
  },[products])

  useEffect(() => {
    if (show) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
    }
  }, [show]);

  return (
    <>
      
      {show  && (
        <div
  className={`overflow-y-auto transition-all fixed top-[74px] w-[500px] max-h-[650px] shadow-2xl border border-gray-200 rounded-lg bg-white 
    duration-500 ease-in-out z-50
    ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
    right-4`}
>
  <ul>
    <h1 className="mt-4 mb-2 text-2xl font-bold text-center text-gray-800">
      🛒 Giỏ hàng
    </h1>
    {products.map((product, index) => (
      <li
        key={index}
        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition"
      >
        <div className="flex items-center justify-between space-x-3">
          <img
            className="object-contain w-16 h-16 rounded-md bg-gray-100 p-1"
            src={product.image}
            alt={product.title}
          />

          <div className="flex-1 min-w-[200px]">
            <h2 className="text-sm font-semibold line-clamp-2 text-gray-800">
              {product.title}
            </h2>
            <p className="text-red-600 font-bold mt-1">{product.price}$</p>
          </div>

  
          <button
            onClick={() => {
              setproducts((prev) =>
                prev.filter((_, i) => i !== index)
              );
            }}
            className="text-red-500 hover:text-red-700 transition"
            title="Xóa sản phẩm"
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </li>
    ))}
  </ul>

  {products.length > 0 && (
    <div className="sticky bottom-0 w-full bg-white p-4 border-t border-gray-200 space-y-3 shadow-inner">
      <h2 className="text-lg font-bold text-gray-800">
        Tổng tiền:{" "}
        <span className="text-red-600">{totalPrice.toFixed(2)}$</span>
      </h2>
              <button
                onClick={() => {
                  localStorage.setItem("cart", JSON.stringify(products));
                  navigate("/thanhtoan");
                }}
       className="w-full p-2 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition">
        Thanh toán
      </button>
    </div>
  )}

  {products.length === 0 && (
    <div className="text-gray-500 flex flex-col min-h-[200px] items-center justify-center space-y-3 p-6">
      <i className="text-4xl fa fa-inbox" aria-hidden="true"></i>
      <p>Giỏ hàng của bạn hiện tại đang trống</p>
    </div>
  )}
</div>

      )}
    </>
  );
}
