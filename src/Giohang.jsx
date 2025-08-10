import React, { useEffect, useState, useMemo } from "react";

export default function Giohang({ products, show }) {
  const [visible, setVisible] = useState(false);
  
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
          className={` overflow-y-auto transition-all fixed top-[74px] w-[500px] max-h-[650px] shadow-2xl border border-gray-300 bg-white 
             duration-500 ease-in-out
            ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
            right-4`}
        >
          <ul>
            <h1 className="text-2xl font-bold text-center">Giỏ hàng</h1>
            {products.map((product, index) => (
              <li key={index} className="p-4 border-b border-gray-200">
                <div className="flex space-x-2 justify-between items-center">
                  <img className=" object-contain w-16 h-16" src={product.image} alt="" />
                  <span>{product.title}</span>
                  <span>{product.price}$</span>
                </div>
              </li>
            ))}
          </ul>
          {products.length > 0 && (
            
            <div className="sticky space-y-2 bottom-0 w-full bg-white p-4 border-t border-gray-200">
            <h2 className="text-xl font-bold">Tổng tiền: {totalPrice.toFixed(2)}$</h2>
            <button className=" font-semibold hover:text-white ease-in duration-300 w-full p-2 cursor-pointer border-2 border-green-600 hover:bg-green-600 bg-green-200  transition">
              Thanh toán</button>
          </div>
          )}
          {products.length == 0 && (
            
            <div className="text-gray-500 flex flex-col min-h-[200px] items-center justify-center h-full space-y-2">
              <i class=" text-4xl fa fa-inbox" aria-hidden="true"></i>
              <p>
                Giỏ hàng của bạn hiện tại đang trống
              </p>
            </div>
          )}
          
        </div>
      )}
    </>
  );
}
