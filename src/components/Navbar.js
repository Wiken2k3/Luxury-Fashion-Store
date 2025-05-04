import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">🖤 Luxury Store</h1>

        <nav className="navbar-links">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/products">Sản phẩm</NavLink>
          <NavLink to="/sale" className="sale-link">🔥 Sale</NavLink>

          <div className="dropdown">
            <span className="dropdown-toggle">Danh mục</span>
            <div className="dropdown-menu">
              <NavLink to="/category/Fear Of God">FEAR OF GOD</NavLink>
              <NavLink to="/category/Burberry">Burberry</NavLink>
              <NavLink to="/category/Adidas">Adidas</NavLink>
              <NavLink to="/category/Bape">BAPE</NavLink>
              <NavLink to="/category/Palm Angels">Palm Angels</NavLink>
              <NavLink to="/category/Off-White">Off-White</NavLink>
            </div>
          </div>

          <NavLink to="/checkout" className="cart-link">
            🛒 <span className="cart-count">{cartCount}</span>
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <input
            type="text"
            className="search-box"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />

          {currentUser ? (
            <div className="icon-group">
              <NavLink to="/profile" className="icon-btn">👤</NavLink>
              <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
            </div>
          ) : (
            <NavLink to="/login" className="icon-btn">👤</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
