import React, { useEffect, useState } from "react";
import "./OrderHistoryPage.css";
import { useNavigate } from "react-router-dom";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("donHang")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="order-history-container">
      <div className="order-history-header">
        <h2>📦 Lịch sử đơn hàng</h2>
        <button className="back-button" onClick={() => navigate("/")}>
          ← Tiếp tục mua hàng
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="no-order">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <span><strong>Mã đơn:</strong> #{order.id}</span>
                <span><strong>Ngày:</strong> {order.date}</span>
              </div>
              <div className="order-body">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} ₫</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span><strong>Phương thức:</strong> {order.payment}</span>
                <span><strong>Tổng:</strong> {order.total.toLocaleString()} ₫</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
