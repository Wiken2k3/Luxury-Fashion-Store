import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <h4 className="product-name">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h4>

      <div className="product-price">
        {product.salePrice ? (
          <>
            <span className="old-price">{product.price.toLocaleString()} đ</span>
            <span className="sale-price">{product.salePrice.toLocaleString()} đ</span>
          </>
        ) : (
          <span className="normal-price">{product.price.toLocaleString()} đ</span>
        )}
      </div>

      <button
        className="product-button"
        onClick={() => onAddToCart(product)}
      >
        🛒 Thêm vào giỏ
      </button>
    </div>
  );
}

export default ProductItem;
