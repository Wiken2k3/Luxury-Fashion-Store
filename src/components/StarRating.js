import React from "react";
import "./StarRating.css";

function StarRating({ rating = 0, setRating, editable = false }) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (value) => {
    if (editable && setRating) {
      setRating(value);
    }
  };

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= rating ? "star filled" : "star"}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
