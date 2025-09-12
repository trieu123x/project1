import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Thanhtoan from "./Thanhtoan";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Product({ products, onAddProduct }) {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const add = () => {
    onAddProduct(prod);
  };
  useEffect(() => {
    fetch(`https://68a1ffce6f8c17b8f5db45c7.mockapi.io/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProd(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (prod?.category) {
      fetch(`https://fakestoreapi.com/products/category/${prod.category}`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((item) => item.id !== prod.id);
          setRelatedProducts(filtered);
        })
        .catch((err) => console.error(err));
    }
  }, [prod]);
  return (
    <div>
      {prod && (
        <>
          <div className="max-w-6xl mx-auto mt-12 rounded-lg overflow-hidden shadow-2xl border border-gray-200 bg-white flex flex-col md:flex-row">
            <div className="bg-gray-100 flex justify-center items-center p-4 md:min-w-[400px]">
              <img
                className="object-contain w-full max-w-[400px] h-auto rounded-md"
                src={prod.image}
                alt={prod.title}
              />
            </div>

            <div className="flex flex-col justify-between p-6 space-y-6 flex-1">
              <p className="text-3xl font-bold text-gray-800">{prod.title}</p>

              <div className="flex items-center space-x-4">
                <p className="px-2 py-1 text-sm rounded-sm border border-amber-400 bg-amber-100 flex items-center">
                  {prod.rate}{" "}
                  <i className="text-amber-500 fa-solid fa-star ml-1"></i>
                </p>
                <p className="text-gray-600">Đã bán {prod.count}</p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {prod.description}
              </p>

              <div className="bg-gray-100 p-4 rounded-md flex items-center space-x-3">
                <p className="text-xl font-semibold text-gray-800">Giá chỉ:</p>
                <p className="text-2xl font-bold text-red-600">
                  {prod.price.toLocaleString("en-US")} VND
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    add();
                  }}
                  className="flex-1 min-w-[140px] bg-emerald-200 border-2 border-emerald-600 text-emerald-900 font-semibold px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white transition-colors duration-300"
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("product", JSON.stringify(prod));
                    navigate("/thanhtoan");
                  }}
                  className="flex-1 min-w-[140px] bg-emerald-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300"
                >
                  Mua ngay
                </button>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="self-end mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md transition-colors duration-300"
              >
                Quay lại
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
