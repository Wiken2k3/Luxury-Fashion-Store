import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import productData from "../data/ProductData";
import ProductItem from "../components/ProductItem";
import ProductFilterBar from "../components/ProductFilterBar";
import "./SearchResultsPage.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage({ onAddToCart }) {
  const query = useQuery();
  const keyword = query.get("q")?.toLowerCase() || "";
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  let results = productData.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );

  const uniqueCategories = [...new Set(results.map((p) => p.category))];

  if (category) results = results.filter((p) => p.category === category);
  if (price === "low") results = results.filter((p) => p.price <= 500000);
  else if (price === "medium") results = results.filter((p) => p.price > 500000 && p.price <= 1000000);
  else if (price === "high") results = results.filter((p) => p.price > 1000000);

  if (sort === "asc") results = [...results].sort((a, b) => a.price - b.price);
  else if (sort === "desc") results = [...results].sort((a, b) => b.price - a.price);

  return (
    <div className="search-container">
      <h2>Kết quả cho: "{keyword}"</h2>

      <ProductFilterBar
        category={category}
        setCategory={setCategory}
        categories={uniqueCategories}
        price={price}
        setPrice={setPrice}
        sort={sort}
        setSort={setSort}
      />

      {results.length === 0 ? (
        <p className="no-results">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="product-grid">
          {results.map((product) => (
            <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
