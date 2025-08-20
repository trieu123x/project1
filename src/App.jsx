import React, { use, useEffect, useState, useMemo } from "react";
import "./App.css";
import Danhmucsp from "./Danhmucsp";
import Product from "./Product";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Thanhtoan from "./Thanhtoan";
import Thetindung from "./PTThanhtoan/Thetindung";
import PayPal from "./PTThanhtoan/Paypal";
import Nhanhang from "./PTThanhtoan/Nhanhang";
import Xacnhan from "./XacNhan";
import Dangki from "./dangki";
import Dangnhap from "./dangnhap";

function App() {
  const [show, setShow] = useState(false);
  const [showGiohang, setShowGiohang] = useState(false);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) setUser(u);
  });

  const totalPrice = useMemo(() => {
    return products.reduce((sum, i) => sum + i.price * i.count, 0);
  }, [products]);

  // bat tat gio hang
  useEffect(() => {
    if (showGiohang) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
    }
  }, [showGiohang]);

  // lay san pham da luu trong gio
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setProducts(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    fetch("https://68a1ffce6f8c17b8f5db45c7.mockapi.io/product")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // them sp vao gio hang
  const addProducts = (newProduct) => {
    setProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === newProduct.id);
      let updated;

      if (existingProduct) {
        updated = prev.map((p) =>
          p.id === newProduct.id ? { ...p, count: p.count + 1 } : p
        );
      } else {
        updated = [...prev, { ...newProduct, count: 1 }];
      }

      //  lưu  dữ liệu mới nhất
      localStorage.setItem("cart", JSON.stringify(updated));

      return updated;
    });

    setCartCount((prev) => prev + 1);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 700);
  };

  // tim kiem san pham
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [search, items]);

  // nut luot len
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* navbar */}
      <nav className="bg-emerald-500  shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
          <h1
            onClick={() => {
              localStorage.removeItem("product");
              navigate("/");
            }}
            className="cursor-pointer text-2xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <i className="fa fa-shopping-basket"></i>
            Super Store
          </h1>

          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                localStorage.removeItem("product");
                navigate("/");
              }}
              className="text-white hover:text-yellow-200 font-medium transition-colors flex items-center gap-1"
            >
              <i className="fa fa-shopping-bag"></i>
              <span className="hidden sm:inline">Products</span>
            </button>

            <button
              onClick={() => {
                setCartCount(0);
                setShowGiohang(!showGiohang);
              }}
              className="text-white hover:text-yellow-200 font-medium transition-colors flex items-center gap-1 relative"
            >
              <i
                className={`fa fa-shopping-cart ${
                  animateCart ? "animate-bounce" : ""
                }`}
              ></i>
              <span className="hidden sm:inline">Giỏ hàng</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative ">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Tìm sản phẩm..."
                className="focus:outline-none focus:ring-2 focus:ring-yellow-300 border border-gray-300 rounded-full px-4 py-1.5 pr-10 w-64 shadow-sm"
              />
              <i className="fa fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i>

              {filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 w-[400px] bg-white border border-gray-300 rounded-md mt-2 z-50 max-h-60 overflow-y-auto shadow-lg">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setSearch("");
                        setFilteredProducts([]);
                      }}
                      className="flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <img
                        className="w-[60px] h-[60px] object-contain rounded"
                        src={p.image}
                        alt={p.title}
                      />
                      <p className="text-sm text-gray-700">{p.title}</p>
                    </div>
                  ))}
                </div>
              )}
              {filteredProducts.length === 0 && search.trim() !== "" && (
                <div className="absolute top-full left-0 w-[400px] bg-white border border-gray-300 rounded-md mt-2 z-50 p-2 shadow-lg">
                  <p className="text-gray-500">Không có kết quả phù hợp</p>
                </div>
              )}
            </div>
          </div>
          {!user && (<div>
            <button
              onClick={() => navigate("/dangki")}
              className="bg-white text-emerald-600 px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition-colors mr-2"
            >
              Đăng ký
            </button>

            <button
              onClick={() => navigate("/dangnhap")}
              className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-yellow-500 transition-colors"
            >
              Đăng nhập
            </button>
          </div>)}
          {user && (
  <div className="flex items-center gap-2 px-4 py-2 ">
    <i className="fas fa-user text-white"></i>
    <p className="text-white font-medium">{user.username}</p>
  </div>
)}
        </div>
      </nav>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Danhmucsp products={items} />} />
        <Route
          path="/product/:id"
          element={<Product products={products} onAddProduct={addProducts} />}
        />
        <Route path="/thanhtoan" element={<Thanhtoan />} />
        <Route path="/ptthanhtoan/thetindung" element={<Thetindung />} />
        <Route path="/ptthanhtoan/paypal" element={<PayPal />} />
        <Route
          path="/ptthanhtoan/nhanhang"
          element={<Nhanhang></Nhanhang>}
        ></Route>
        <Route path="/xacnhan" element={<Xacnhan></Xacnhan>}></Route>
        <Route path="/dangki" element={<Dangki></Dangki>}></Route>
        <Route path="/dangnhap" element={<Dangnhap></Dangnhap>}></Route>
      </Routes>
      {/* Gio hang */}
      {showGiohang && (
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
                    <p className="text-red-600 font-bold mt-1">
                      {product.price.toLocaleString("en-US")} VND
                    </p>
                  </div>
                  <p className=" ml-6">Số lượng {product.count}</p>
                  <button
                    className="ml-4 mr-4 font-bold cursor-pointer"
                    onClick={() => {
                      if (product.count > 1) {
                        setProducts((prev) =>
                          prev.map((p) =>
                            p.id == product.id
                              ? { ...p, count: p.count - 1 }
                              : p
                          )
                        );
                      } else {
                        setProducts((prev) =>
                          prev.filter((p) => p.id !== product.id)
                        );
                      }
                    }}
                  >
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      setProducts((prev) => prev.filter((_, i) => i !== index));
                      localStorage.setItem(
                        "cart",
                        JSON.stringify(products.filter((_, i) => i !== index))
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
                <span className="text-red-600">
                  {totalPrice.toLocaleString("en-US")} VND
                </span>
              </h2>
              <button
                onClick={() => {
                  localStorage.removeItem("product");
                  setShowGiohang(false);
                  navigate("/thanhtoan");
                }}
                className="w-full p-2 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition"
              >
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
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className=" bg-green-400 fixed right-2 bottom-10 w-[50px] h-[50px] rounded-full flex justify-center items-center shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
      )}
    </>
  );
}

export default App;
