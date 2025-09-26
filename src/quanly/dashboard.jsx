import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";
import React, { use, useEffect, useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
const data = [];

export default function Dashboard({ items, users }) {
  const navigate = useNavigate();
  const totalPrice = useMemo(() => {
    if (!users || users.length === 0) return 0;
    return users.reduce((sum, user) => {
      const sp = user.spend || 0;
      sum += sp;
      return sum;
    }, 0);
  }, [users]);

  const totalOrder = useMemo(() => {
    if (!users || users.length === 0) return 0;
    return users.reduce((sum, user) => {
      const order = user.order.length || 0;
      sum += order;
      return sum;
    }, 0);
  }, [users]);
  const role = localStorage.getItem("role");
  if (role != "admin") {
    navigate("/");
  }

  const chartData = useMemo(() => {
  if (!users) return [];

  const monthlyRevenue = {};

  users.forEach(user => {
    user.order?.forEach(order => {
      let key = "Unknown";

      if (order.date) {
        // "01:43:12 26/9/2025"
        const [time, dmy] = order.date.split(" "); // ["01:43:12", "26/9/2025"]
        const [day, month, year] = dmy.split("/"); // ["26", "9", "2025"]

        // Tạo key "09-2025"
        key = `${month.padStart(2, "0")}-${year}`;
      }

      const amount = (order.price || 0) * (order.cnt || 1);
      monthlyRevenue[key] = (monthlyRevenue[key] || 0) + amount;
    });
  });

  return Object.keys(monthlyRevenue).map(key => ({
    month: key,
    revenue: monthlyRevenue[key],
  }));
}, [users]);


  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow-md p-4 rounded-xl flex items-center">
            <DollarSign className="text-green-500 w-8 h-8" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Doanh thu</p>
              <p className="text-lg font-bold">
                {totalPrice.toLocaleString("en-US")} VND
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-xl flex items-center">
            <ShoppingCart className="text-blue-500 w-8 h-8" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Đơn hàng</p>
              <p className="text-lg font-bold">{totalOrder}</p>
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-xl flex items-center">
            <Users className="text-purple-500 w-8 h-8" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Khách hàng</p>
              <p className="text-lg font-bold">{users.length - 1}</p>
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-xl flex items-center">
            <Package className="text-orange-500 w-8 h-8" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Sản phẩm</p>
              <p className="text-lg font-bold">{items.length}</p>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white shadow-md p-4 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Đơn hàng mới nhất</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Mã đơn</th>
                <th className="p-2">Khách hàng</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">#1234</td>
                <td className="p-2">Nguyễn Văn A</td>
                <td className="p-2 text-blue-600">Đang giao</td>
                <td className="p-2">1.200.000₫</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">#1235</td>
                <td className="p-2">Trần Thị B</td>
                <td className="p-2 text-green-600">Hoàn thành</td>
                <td className="p-2">3.500.000₫</td>
              </tr>
              <tr>
                <td className="p-2">#1236</td>
                <td className="p-2">Lê Văn C</td>
                <td className="p-2 text-red-600">Hủy</td>
                <td className="p-2">0₫</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
