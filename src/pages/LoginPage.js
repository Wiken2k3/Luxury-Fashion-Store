import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matched = savedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (matched) {
      localStorage.setItem("currentUser", JSON.stringify(matched));
      alert("✅ Đăng nhập thành công!");
      navigate("/");
    } else {
      alert("❌ Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
        <p className="auth-note">
          Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
