import React, { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

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
  }, []);
  return (
    <>
      <div className=" shadow-2xl mt-12 border-1 border-gray-300 bg-white mx-auto top-[72px]  w-1/2 min-h-[600px]">
        <p className=" ml-2 mr-2 text-2xl font-semibold p-6  border-b-2 border-gray-400">
          <i
            className="text-4xl fa-solid fa-credit-card mr-2"
            aria-hidden="true"
          ></i>{" "}
          Thanh toán bằng thẻ tin dụng
        </p>
        <div className=" flex flex-wrap w-full justify-between space-x-8 p-6">
          <div className="w-[360px]">
            <p className="text-lg font-semibold">Thông tin thẻ tin dung </p>
            <form className="space-y-4">
              <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                type="number"
                placeholder="Số thẻ"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                type="text"
                placeholder="Họ và tên chủ thẻ"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                type="date"
                placeholder="Ngày hết hạn (MM/YY)"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                type="number"
                placeholder="Mã CVV"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </form>
          </div>
          <div className="w-[360px]">
            <p className="text-lg font-semibold">Địa chỉ</p>
            <form className="space-y-4">
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="Thành phố"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                type="text"
                placeholder="Quân/huyện"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                type="text"
                placeholder="Xa/phường"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                placeholder="Địa chỉ chi tiết"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </form>
          </div>
        </div>
        <div className="p-6 w-1/3">
          <p className="text-lg font-semibold">Số Điện Thoại</p>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="num
                ber"
            placeholder="Số Điện Thoại"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="p-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Lưu thông tin cho lần sau</span>
          </label>
        </div>
        <div className="flex  justify-around p-6">
          <button
            onClick={() => {
              handleSubmit();
              navigate(-1);
            }}
            className=" bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-4 py-2 rounded-md"
          >
            Quay lại
          </button>
          <button
            onClick={() => {
              
              handleSubmit();navigate("/xacnhan",{ state: { product } });
            }}
            className="  bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white font-semibold px-4 py-2 rounded-md"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </>
  );
}
