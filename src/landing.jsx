import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
const banners = [
  "https://www.aeon.com.vn/wp-content/uploads/2024/06/cap-nhat-gio-mo-cua-cua-sieu-thi-aeon.jpg",
  "https://linhvucbanle.com/wp-content/uploads/2021/03/do-dien-trong-gia-dinh.jpg",
  "https://doji.vn/wp-content/uploads/2023/09/2.jpg",
];

const deals = [
  {
    name: "Deal Từ 1.000đ",
    img: "https://dealngon24h.com/wp-content/uploads/2021/06/dealngon24h.jpg",
  },
  {
    name: "Xử Lý",
    img: "https://atosa.asia/wp-content/uploads/2021/12/lac_xu_shopee_1_d09994db2c.png",
  },
  {
    name: "Deal Hot Giờ Vàng",
    img: "https://dienmaythiennamhoa.vn/static/images/Hinh%20Bai%20Ve%20Tinh/KM/3(1).PNG",
  },
  {
    name: " Style Voucher 30%",
    img: "https://product.hstatic.net/200000551679/product/tag-06_6552a70c312a462f894288cfb8f947f7_grande.png",
  },
  {
    name: "Săn Ngay 100.000 Xu",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFemFfhY50Fd6WegwsEZNSeCUL8fCf59NQkw&s",
  },
  {
    name: "Mã Giảm Giá",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIOE9sqACCCqcsMNbl0EXsDh4f1OfBpLyZ1Q&s",
  },
  {
    name: "Khách Hàng Thân Thiết",
    img: "https://file.hstatic.net/1000230347/file/khtt_f7d12f4b7f9e4bb7bf33607fedb78d4c.jpg",
  },
];

const categories = [
  {
    name: "Tất cả sản phẩm",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg/1200px-Republic_Of_Korea_Broadcasting-TV_Rating_System%28ALL%29.svg.png",
  },
  {
    name: "Quần áo nam",
    img: "https://thoitrangbigsize.vn/wp-content/uploads/2024/07/6-2.jpg",
  },
  {
    name: "Quần áo nữ",
    img: "https://doboinam.vn/upload/product/dbn-232/bo-quan-ao-di-bien-nu-cao-cap.jpg",
  },
  {
    name: "Điện Tử",
    img: "https://2handland.com/assets/image/upload/thu-mua-do-dien-tu-1.jpg",
  },
  {
    name: "Trang Sức",
    img: "https://images2.thanhnien.vn/528068263637045248/2024/4/25/pnj-pr1-11-1714021256443577666640.png",
  },
];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    setCurrent(current === 0 ? banners.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === banners.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto mt-4 gap-4">
        {/* Banner chính */}
        <div className="relative flex-[2] overflow-hidden aspect-[18/9] rounded-lg">
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {banners.map((banner, i) => (
              <img
                key={i}
                src={banner}
                alt={`banner-${i}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Banner phụ */}
        <div className="flex flex-col flex-1 justify-between gap-4 md:gap-0 mt-4 md:mt-0">
          <div className="aspect-[18/7]">
            <img
              src="https://www.bigc.vn/files/banners/2021/apr-21/resize-template-black-red-deal-ngon-b-ng-n-co-logo-cover-blog-go.jpg"
              alt="banner"
              className="w-full h-full object-cover rounded-lg border"
            />
          </div>
          <div className="aspect-[18/7] hidden md:block">
            <img
              src="https://www.bigc.vn/files/banners/2023/apr/new-node-17-05-2023-17-40-16/1080-go.jpg"
              alt="banner"
              className="w-full h-full object-cover rounded-lg border"
            />
          </div>
        </div>
      </div>

      {/* Deal icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto mt-8 px-2">
        {deals.map((deal, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white 
            rounded-2xl border border-gray-200 h-[120px] p-2 
            shadow-sm transition-all duration-300 
            hover:shadow-lg hover:border-green-400 hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={deal.img}
              alt={deal.name}
              className="w-16 h-16 mb-2 rounded-lg"
            />
            <p className="text-xs sm:text-sm text-center line-clamp-2">
              {deal.name}
            </p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold mb-4">DANH MỤC</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => {
                navigate("/products", { state: { category: cat.name } });
                window.scrollTo(0, 0);
              }}
              className="flex flex-col items-center justify-between 
              cursor-pointer p-2 
              border border-gray-200 rounded-2xl 
              shadow-sm transition-all duration-300 
              hover:shadow-lg hover:border-green-400 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="rounded-full w-20 h-20 object-cover"
                />
              </div>
              <p className="text-xs sm:text-sm text-center mt-2">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-green-500 mt-8">
        {/* Top line */}
        <div className="flex flex-col md:flex-row justify-around text-sm py-4 border-b border-gray-300 bg-gradient-to-r from-green-50 to-white gap-4 md:gap-0 px-4">
          <div className="flex items-start gap-2 hover:text-green-600 cursor-pointer">
            <span className="text-red-600 text-xl">↩</span>
            <p>
              Trả hàng <b>Miễn phí 15 ngày</b>
              <br />
              Trả hàng miễn phí trong 15 ngày
            </p>
          </div>
          <div className="flex items-start gap-2 hover:text-green-600 cursor-pointer">
            <span className="text-red-600 text-xl">🛡</span>
            <p>
              Hàng chính hãng 100% <br />
              Đảm bảo hàng chính hãng hoặc hoàn tiền gấp đôi
            </p>
          </div>
          <div className="flex items-start gap-2 hover:text-green-600 cursor-pointer">
            <span className="text-red-600 text-xl">🚚</span>
            <p>
              Miễn phí vận chuyển <br />
              Giao hàng miễn phí toàn quốc
            </p>
          </div>
        </div>

        {/* Middle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto py-8 text-sm px-4">
          {/* Các cột footer giữ nguyên ... */}
        </div>

        {/* Bottom */}
        <div className="border-t text-center text-xs py-4 text-gray-600 px-4">
          © 2025 Shopee. Tất cả các quyền được bảo lưu.
          <br />
          Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt
          Nam | Philippines | Brazil | Mexico | Colombia | Chile | Đài Loan
        </div>
      </footer>
    </div>
  );
}

