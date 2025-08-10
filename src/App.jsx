import React, { use, useEffect, useState } from "react";
import "./App.css";
import Danhmucsp from "./Danhmucsp";
import Giohang from "./Giohang";
import Product from "./Product";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Thanhtoan from "./Thanhtoan";


function App() {
  const [show, setShow] = useState(false);
  const [showGiohang, setShowGiohang] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  console.log(products);

  const addProducts = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  }


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
      <nav className="  border-b-2 bg-emerald-400 w-full h-[60px]">
        <div className=" w-[900px] h-full mx-auto flex flex-wrap justify-between items-center">
          <h1 onClick={()=>navigate("/")} className=" cursor-pointer text-2xl font-bold">
            <i className=" p-1 border-r-[1.5px] fa fa-shopping-basket" aria-hidden="true"></i> Super Store
          </h1>
          <div className=" flex space-x-6 flex-row items-center">
            <a onClick={() => navigate("/")}
              
              className=" cursor-pointer relative after:content-[''] after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300"
            >
              <i class="mr-1 fa fa-shopping-bag" aria-hidden="true">
                
              </i>
              Products
              </a>
            <a
              onClick={() => setShowGiohang(!showGiohang)}
              
              className="cursor-pointer relative after:content-[''] after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300"
            >
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> Gio hang
            </a>
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none focus:border-blue-700 border-2 border-black rounded-xl px-2 py-1"
            />
          </div>
        </div>
      </nav>
      
        <Routes>
          <Route path="/" element={<Danhmucsp/>}/>
          <Route path="/product/:id" element={<Product products={products} onAddProduct={addProducts} />} />
          <Route path="/thanhtoan" element={<Thanhtoan/>}/>
        </Routes>
      
      {showGiohang && <Giohang products={products} show={showGiohang}></Giohang>}
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
