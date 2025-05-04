import React, { useState } from 'react';
import './CheckoutPage.css';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cartItems = [], total = 0, onComplete }) => {
  const [items, setItems] = useState([...cartItems]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // 👈 Thêm dòng này

  const totalBefore = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAfter = totalBefore - totalBefore * discount;

  const handleQuantityChange = (id, type) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'inc'
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyVoucher = () => {
    if (voucher.toLowerCase() === 'luxury10') {
      setDiscount(0.1);
    } else {
      alert('Mã không hợp lệ');
      setDiscount(0);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return alert('Giỏ hàng trống!');

    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('vi-VN'),
      items,
      total: totalAfter,
      payment: paymentMethod,
      email: currentUser?.email || "", // 👈 Gắn email để lọc bên ProfilePage
    };

    const existing = JSON.parse(localStorage.getItem('donHang')) || [];
    localStorage.setItem('donHang', JSON.stringify([...existing, newOrder]));

    alert('✅ Đặt hàng thành công!');
    onComplete?.();
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <form className="billing-form" onSubmit={handlePlaceOrder}>
        <h2>Thông tin thanh toán</h2>
        <div className="form-row">
          <input type="text" placeholder="Tên *" required />
          <input type="text" placeholder="Họ *" required />
        </div>
        <div className="form-row">
          <input type="text" placeholder="Địa chỉ *" required />
          <input type="text" placeholder="Căn hộ, đơn vị, v.v." />
        </div>
        <div className="form-row">
          <input type="tel" placeholder="Số điện thoại *" required />
          <input type="email" placeholder="Địa chỉ email *" required />
        </div>
        <div className="form-group">
          <textarea placeholder="Ghi chú đơn hàng (tuỳ chọn)" rows="4" />
        </div>

        <div className="payment-methods">
          <label><input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Thanh toán khi nhận hàng</label>
          <label><input type="radio" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} /> Chuyển khoản ngân hàng</label>
          <label><input type="radio" value="momo" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} /> Ví MoMo</label>
        </div>

        <button type="submit" className="place-order-btn">Đặt hàng</button>
        <p className="privacy-note">
          Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, nâng cao trải nghiệm, và tuân theo <a href="/chinh-sach-bao-mat">chính sách bảo mật</a>.
        </p>
      </form>

      <div className="order-summary">
        <h2>Đơn hàng của bạn</h2>
        {items.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          <>
            {items.map((item) => (
              <div className="order-item" key={item.id}>
                <div className="item-top">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()} ₫</span>
                </div>
                <div className="item-controls">
                  <button onClick={() => handleQuantityChange(item.id, 'dec')}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
                  <button className="remove-item" onClick={() => handleRemove(item.id)}>❌</button>
                </div>
              </div>
            ))}

            <div className="voucher-section">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
              <button onClick={applyVoucher}>Áp dụng</button>
            </div>

            <div className="order-totals">
              <div><span>Tạm tính</span><span>{totalBefore.toLocaleString()} ₫</span></div>
              {discount > 0 && (
                <div><span>Giảm</span><span>-{(totalBefore * discount).toLocaleString()} ₫</span></div>
              )}
              <div><span>Giao hàng</span><span>Miễn phí</span></div>
              <div className="total"><span>Tổng</span><span>{totalAfter.toLocaleString()} ₫</span></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
