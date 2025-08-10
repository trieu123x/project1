import React, { use, useEffect, useState } from "react";
import "./App.css";

export default function Thanhtoan() {
  return (
    <>
      
        <div className=" shadow-2xl border-1 border-gray-300 bg-white fixed top-[72px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px]">
          <p className=" ml-2 mr-2 text-2xl font-semibold p-6  border-b-2 border-gray-400">
            Chọn phương thức thanh toán
          </p>
          <div className=" flex flex-col space-y-4 p-6">
            <ul className=" space-y-6">
              <li className=" cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                <i
                  className="text-2xl fa-solid fa-credit-card mr-2"
                  aria-hidden="true"
                ></i>
                Thanh toán bằng thẻ tín dụng
              </li>
              <li className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                <i
                  className=" text-2xl fa-brands fa-cc-paypal mr-2"
                  aria-hidden="true"
                ></i>
                Thanh toán qua PayPal
              </li>
              <li className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                <i
                  className="text-2xl fa-solid fa-money-bill mr-2"
                  aria-hidden="true"
                ></i>
                Thanh toán khi nhận hàng
              </li>
            </ul>
          </div>
        </div>
      
    </>
  );
}
