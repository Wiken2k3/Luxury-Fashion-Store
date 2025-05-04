import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allOrders = JSON.parse(localStorage.getItem("donHang")) || [];

    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
      const userOrders = allOrders.filter(order => order.email === currentUser.email);
      setOrders(userOrders);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>👤 Thông tin tài khoản</h2>

      {user && (
        <div className="profile-info">
          <p><strong>Họ tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
        </div>
      )}

      <h3>🧾 Lịch sử đơn hàng</h3>

      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="profile-orders">
          {orders.map((order, index) => (
            <div key={index} className="order-summary-card">
              <p><strong>Mã đơn:</strong> #{order.id}</p>
              <p><strong>Ngày:</strong> {order.date}</p>
              <p><strong>Phương thức:</strong> {order.payment}</p>
              <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()} ₫</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
