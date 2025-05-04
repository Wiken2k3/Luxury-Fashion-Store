import React, { useState } from "react";
import productData from "../data/ProductData";
import ProductItem from "../components/ProductItem";
import ProductFilterBar from "../components/ProductFilterBar";
import "./SalePage.css";

function SalePage({ onAddToCart }) {
  const saleProducts = productData.filter((p) => p.salePrice !== undefined);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  const uniqueCategories = [...new Set(saleProducts.map((p) => p.category))];

  let filteredProducts = [...saleProducts];

  if (category) filteredProducts = filteredProducts.filter(p => p.category === category);
  if (price === "low") filteredProducts = filteredProducts.filter(p => p.salePrice <= 300000);
  else if (price === "medium") filteredProducts = filteredProducts.filter(p => p.salePrice > 300000 && p.salePrice <= 500000);
  else if (price === "high") filteredProducts = filteredProducts.filter(p => p.salePrice > 500000);

  if (sort === "asc") filteredProducts.sort((a, b) => a.salePrice - b.salePrice);
  else if (sort === "desc") filteredProducts.sort((a, b) => b.salePrice - a.salePrice);

  return (
    <div className="product-page">
      <h2 className="page-title">🔥 Sản phẩm đang giảm giá</h2>

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
        <p className="no-products">Không có sản phẩm khuyến mãi.</p>
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

export default SalePage;
