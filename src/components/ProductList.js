import React, { useState } from "react";
import productData from "../data/ProductData";
import ProductItem from "./ProductItem";
import ProductFilterBar from "./ProductFilterBar";
import "./ProductList.css";

function ProductList({ onAddToCart }) {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  const uniqueCategories = [...new Set(productData.map((p) => p.category))];

  let filteredProducts = [...productData];

  if (category) filteredProducts = filteredProducts.filter((p) => p.category === category);
  if (price === "low") filteredProducts = filteredProducts.filter((p) => p.price <= 500000);
  else if (price === "medium") filteredProducts = filteredProducts.filter((p) => p.price > 500000 && p.price <= 1000000);
  else if (price === "high") filteredProducts = filteredProducts.filter((p) => p.price > 1000000);

  if (sort === "asc") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  else if (sort === "desc") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);

  return (
    <div className="product-section">
      <h2 className="section-title">🧥 Danh sách sản phẩm</h2>

      <ProductFilterBar
        category={category}
        setCategory={setCategory}
        categories={uniqueCategories}
        price={price}
        setPrice={setPrice}
        sort={sort}
        setSort={setSort}
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
