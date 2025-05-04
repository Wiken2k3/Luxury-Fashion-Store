import React, { useState } from "react";
import ProductItem from "./ProductItem";
import ProductFilterBar from "./ProductFilterBar";
import "./FilterableProductGrid.css";

function FilterableProductGrid({ products, onAddToCart }) {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  let filtered = products;

  if (category) filtered = filtered.filter((p) => p.category === category);

  if (price) {
    filtered = filtered.filter((p) => {
      if (price === "low") return p.price <= 500000;
      if (price === "medium") return p.price > 500000 && p.price <= 1000000;
      if (price === "high") return p.price > 1000000;
      return true;
    });
  }

  if (sort === "asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="filterable-section">
      <ProductFilterBar
        category={category}
        setCategory={setCategory}
        categories={uniqueCategories}
        price={price}
        setPrice={setPrice}
        sort={sort}
        setSort={setSort}
      />

      {filtered.length === 0 ? (
        <p className="no-products">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductItem key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterableProductGrid;
