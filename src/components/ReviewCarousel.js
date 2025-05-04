import React, { useState, useEffect, useRef } from "react";
import "./ReviewCarousel.css";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const allReviews = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviews-")) {
        const stored = JSON.parse(localStorage.getItem(key)) || [];
        stored.forEach((r) => {
          allReviews.push({
            name: r.user || "Khách hàng",
            rating: r.rating,
            comment: r.comment,
            date: r.date,
          });
        });
      }
    }

    setReviews(allReviews);
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) handleNext();
    else if (delta < -50) handlePrev();
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  if (reviews.length === 0) return <p>Chưa có đánh giá nào.</p>;

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="carousel-title">Đánh giá của khách hàng</h2>
      <div className="carousel-content">
        <button onClick={handlePrev} className="arrow left">&#10094;</button>
        <div className="review-card">
          <h4>{reviews[index].name}</h4>
          <p>{"⭐".repeat(reviews[index].rating)}</p>
          <p>{reviews[index].comment}</p>
          <small>{reviews[index].date}</small>
        </div>
        <button onClick={handleNext} className="arrow right">&#10095;</button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
