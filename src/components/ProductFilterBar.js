import React from "react";
import "./ProductFilterBar.css";

function ProductFilterBar({ category, setCategory, categories = [], price, setPrice, sort, setSort }) {
  return (
    <div className="filters-container">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Tất cả danh mục</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>

      <select value={price} onChange={(e) => setPrice(e.target.value)}>
        <option value="">Tất cả mức giá</option>
        <option value="low">Dưới 500k</option>
        <option value="medium">500k - 1 triệu</option>
        <option value="high">Trên 1 triệu</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sắp xếp</option>
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
      </select>
    </div>
  );
}

export default ProductFilterBar;
