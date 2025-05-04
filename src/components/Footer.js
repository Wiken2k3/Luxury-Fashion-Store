import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Giới thiệu</h4>
            <ul>
              <li><Link to="/ve-chung-toi">Về chúng tôi</Link></li>
              <li><Link to="/doi-tac">Đối tác</Link></li>
              <li><Link to="/tuyen-dung">Tuyển dụng</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><Link to="/huong-dan">Hướng dẫn mua hàng</Link></li>
              <li><Link to="/chinh-sach-doi-tra">Chính sách đổi trả</Link></li>
              <li><Link to="/cau-hoi-thuong-gap">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Chính sách</h4>
            <ul>
              <li><Link to="/chinh-sach-bao-mat">Bảo mật</Link></li>
              <li><Link to="/checkout">Thanh toán</Link></li>
              <li><Link to="/chinh-sach-van-chuyen">Vận chuyển</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Liên hệ</h4>
            <ul>
              <li>Email: wiken2k3@gmail.com</li>
              <li>Hotline: 0989 648 691</li>
              <li>Địa chỉ: 292/16 GS14, Đông Hoà, Dĩ An, Bình Dương</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Luxury Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
