import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import Navbar from "./components/Navbar";
import "./index.css";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import SalePage from "./pages/SalePage";
import ReviewCarousel from "./components/ReviewCarousel";
import VeChungToi from "./pages/VeChungToi";
import DoiTac from "./pages/DoiTac";
import TuyenDung from "./pages/TuyenDung";
import HuongDan from "./pages/HuongDan";
import ChinhSachDoiTra from "./pages/ChinhSachDoiTra";
import CauHoiThuongGap from "./pages/CauHoiThuongGap";
import ChinhSachBaoMat from "./pages/ChinhSachBaoMat";
import ChinhSachThanhToan from "./pages/ChinhSachThanhToan";
import ChinhSachVanChuyen from "./pages/ChinhSachVanChuyen";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

// Phần tách riêng xử lý các route và logic
function AppContent() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("gioHang");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("gioHang", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      const updated = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updated);
      toast.info(`Đã tăng số lượng của "${product.name}"`);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
    }
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    const product = cartItems.find((item) => item.id === id);
    toast.info(`Tăng số lượng: "${product.name}"`);
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
    const product = cartItems.find((item) => item.id === id);
    toast.info(`Giảm số lượng: "${product.name}"`);
  };

  const removeFromCart = (id) => {
    const product = cartItems.find((item) => item.id === id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.warn(`Đã xoá "${product.name}" khỏi giỏ hàng`);
  };

  const removeAll = () => {
    setCartItems([]);
    localStorage.removeItem("gioHang");
    toast.success("🎉 Đặt hàng thành công!");
  };

  return (
    <div className="container">
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProductList onAddToCart={addToCart} />
              <Cart
                cartItems={cartItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
                onCheckout={() => navigate("/checkout")}
              />
            </>
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              onComplete={removeAll}
            />
          }
        />

        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route
        path="/product/:id"
        element={<ProductDetail onAddToCart={addToCart} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchResultsPage onAddToCart={addToCart} />} />
        <Route path="/category/:type" element={<ProductPage onAddToCart={addToCart} />} />
        <Route path="/products" element={<ProductPage onAddToCart={addToCart} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/sale" element={<SalePage onAddToCart={addToCart} />} />
        <Route path="/ve-chung-toi" element={<VeChungToi />} />
        <Route path="/doi-tac" element={<DoiTac />} />
        <Route path="/tuyen-dung" element={<TuyenDung />} />
        <Route path="/huong-dan" element={<HuongDan />} />
        <Route path="/chinh-sach-doi-tra" element={<ChinhSachDoiTra />} />
        <Route path="/cau-hoi-thuong-gap" element={<CauHoiThuongGap />} />
        <Route path="/chinh-sach-bao-mat" element={<ChinhSachBaoMat />} />
        <Route path="/chinh-sach-thanh-toan" element={<ChinhSachThanhToan />} />
        <Route path="/chinh-sach-van-chuyen" element={<ChinhSachVanChuyen />} />
      </Routes>
      <ReviewCarousel/>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
