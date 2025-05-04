import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productData from "../data/ProductData";
import ProductItem from "../components/ProductItem";
import ProductFilterBar from "../components/ProductFilterBar";
import "./ProductPage.css";

function ProductPage({ onAddToCart }) {
  const { type } = useParams();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  let filteredProducts = type
    ? productData.filter((p) => p.category === type)
    : productData;

  const uniqueCategories = [...new Set(filteredProducts.map((p) => p.category))];

  // Áp dụng bộ lọc
  if (category) filteredProducts = filteredProducts.filter((p) => p.category === category);

  if (price === "low") filteredProducts = filteredProducts.filter((p) => p.price <= 500000);
  else if (price === "medium") filteredProducts = filteredProducts.filter((p) => p.price > 500000 && p.price <= 1000000);
  else if (price === "high") filteredProducts = filteredProducts.filter((p) => p.price > 1000000);

  if (sort === "asc") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  else if (sort === "desc") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);

  return (
    <div className="product-page">
      <h2 className="page-title">{type ? `🧾 Danh mục: ${type.toUpperCase()}` : "🛍️ Tất cả sản phẩm"}</h2>

      <ProductFilterBar
        category={category}
        setCategory={setCategory}
        categories={uniqueCategories}
        price={price}
        setPrice={setPrice}
        sort={sort}
        setSort={setSort}
      />

      {filteredProducts.length === 0 ? (
        <p className="no-products">Không có sản phẩm nào phù hợp.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <ProductItem key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
