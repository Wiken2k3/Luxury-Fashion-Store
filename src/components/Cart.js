import React from "react";
import "./Cart.css";

function Cart({ cartItems, onIncrease, onDecrease, onRemove, onCheckout }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>🛒 Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Giỏ hàng đang trống.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="info">
                  <h4>{item.name}</h4>
                  <p>{item.price.toLocaleString()} đ</p>
                  <div className="quantity">
                    <button onClick={() => onDecrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncrease(item.id)}>+</button>
                  </div>
                </div>
                <button className="remove" onClick={() => onRemove(item.id)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="total">Tổng cộng: {total.toLocaleString()} đ</div>

          <div className="checkout">
            <button className="checkout-btn" onClick={onCheckout}>
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
