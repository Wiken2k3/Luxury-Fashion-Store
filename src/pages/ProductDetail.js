import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productData from "../data/ProductData";
import StarRating from "../components/StarRating";
import "./ProductDetail.css";

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const found = productData.find((item) => item.id === parseInt(id));
    setProduct(found);
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(storedReviews);
  }, [id]);

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Vui lòng đăng nhập để đánh giá sản phẩm.");
      return;
    }

    const newReview = {
      user: currentUser.email,
      rating,
      comment,
      date: new Date().toLocaleDateString("vi-VN"),
    };

    const updated = [newReview, ...reviews];
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
    setReviews(updated);
    setComment("");
    setRating(5);
  };

  const avgRating =
    reviews.length === 0
      ? 0
      : Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length);

  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-image-large" />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">{product.price.toLocaleString()} đ</p>
        <StarRating rating={avgRating} />
        <p className="product-description">
          Đây là mẫu {product.name} thuộc bộ sưu tập cao cấp 2025. Thiết kế với chất liệu cao cấp, phong cách sang trọng.
        </p>

        <div className="product-actions">
          <label>Số lượng:</label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button className="add-to-cart-btn" onClick={handleAdd}>
            🛒 Thêm vào giỏ
          </button>
        </div>

        <div className="review-section">
          <h3>⭐ Đánh giá sản phẩm ({reviews.length})</h3>
          <form onSubmit={handleSubmitReview} className="review-form">
            <StarRating rating={rating} setRating={setRating} editable />
            <textarea
              placeholder="Nhận xét của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="submit-review-btn">Gửi đánh giá</button>
          </form>

          {reviews.map((r, idx) => (
            <div key={idx} className="single-review">
              <StarRating rating={r.rating} />
              <p><strong>{r.user}</strong> ({r.date})</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
