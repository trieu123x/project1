import React, { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { handleBuy } from "./handleBuy";
import { handleBuyCart } from "./handleBuyCart";

export default function PayPal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    phone: "",
  });
  const [remember, setRemember] = useState(false);
  const [product, setProduct] = useState(null);
  const [emes, setEmes] = useState(false);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (emes) {
      setShow(true);
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
      setTimeout(() => setShow(false), 500);
    }
  }, [emes]);
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
      setRemember(true);
    }
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    if (remember) {
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      localStorage.removeItem("formData");
    }
  };
  useEffect(() => {
    const stored = localStorage.getItem("product");
    if (stored) setProduct(JSON.parse(stored));
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);
  return (
    <>
      <div className="max-w-5xl mx-auto mt-12 p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
        <p className="text-2xl font-semibold mb-6 flex items-center border-b pb-3">
          <i className="text-4xl fa-solid fa-credit-card mr-3 text-emerald-500"></i>
          Thanh toán bằng thẻ tín dụng
        </p>

        {show && (
          <div
            className={` fixed top-12 left-1/2 -translate-1/2 bg-red-100 text-red-700 p-4 rounded-md transition-all duration-500 
    ${
      visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-3 pointer-events-none"
    }
  `}
          >
            <p>Bạn cần điền đầy đủ thông tin trước khi tiếp tục</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg font-semibold mb-4">Thông tin thẻ tín dụng</p>
            <form className="space-y-4">
              <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                type="number"
                placeholder="Số thẻ"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                type="text"
                placeholder="Họ và tên chủ thẻ"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                type="date"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                type="number"
                placeholder="Mã CVV"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </form>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4">Địa chỉ</p>
            <form className="space-y-4">
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="Thành phố"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                type="text"
                placeholder="Quận/Huyện"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                type="text"
                placeholder="Xã/Phường"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                placeholder="Địa chỉ chi tiết"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </form>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold mb-2">Số điện thoại</p>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="number"
            placeholder="Số điện thoại"
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Lưu thông tin cho lần sau</span>
        </div>

        <div className="mt-8">
          <p className="text-lg font-semibold mb-4 border-b pb-2">
            Thông tin sản phẩm
          </p>
          {product && (
            <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-50 shadow-sm rounded-xl p-4 gap-6">
              <div className="flex-shrink-0">
                <img
                  className="w-[180px] h-[180px] object-contain rounded-lg border border-gray-200 bg-white p-2"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col justify-between text-center md:text-left gap-2">
                <p className="text-lg font-bold text-gray-800">
                  {product.title}
                </p>
                <p className="text-xl font-bold text-red-500">
                  {product.price} $
                </p>
              </div>
            </div>
          )}
          {cart && cart.length > 0 && product == null && (
            cart.map((item) => (
            
                <div key={item.id} className="flex mb-4 flex-col md:flex-row items-center md:items-start bg-gray-50 shadow-sm rounded-xl p-4 gap-6">
                  <div className="flex-shrink-0">
                    <img
                      className="w-[180px] h-[180px] object-contain rounded-lg border border-gray-200 bg-white p-2"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex flex-col justify-between text-center md:text-left gap-2">
                    <p className="text-lg font-bold text-gray-800">{item.title}</p>
                    <p className="text-xl font-bold text-red-500">{item.price} $</p>
                  </div>
                </div>
             
            ))
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-4 mt-8">
          <button
            onClick={() => {
              handleSubmit();
              navigate(-1);
            }}
            className="bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-gray-700 font-semibold px-6 py-2 rounded-md"
          >
            Quay lại
          </button>
          <button
            onClick={async() => {
              {
                if (
                  !formData.cardNumber ||
                  !formData.cardName ||
                  !formData.expiry ||
                  !formData.cvv ||
                  !formData.city ||
                  !formData.district ||
                  !formData.ward ||
                  !formData.address ||
                  !formData.phone
                ) {
                  setEmes(true);
                  setTimeout(() => {
                    setEmes(false);
                  }, 3000);
                  return;
                }
              }
              handleSubmit();
              {if (product){await handleBuy(product)}}
              navigate("/xacnhan");
              localStorage.removeItem("product");
              {
                if (cart && cart.length > 0 && product == null) {
      await handleBuyCart(cart)
      localStorage.removeItem("cart", JSON.stringify(cart));
    }
              }
              setTimeout(() => {
      window.location.reload(); // reload sau khi navigate
    }, 100);
              
            }}
            className="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-6 py-2 rounded-md"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </>
  );
}
