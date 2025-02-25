import React from "react";
import { Link } from "react-router-dom";
import "./nav.css"; // CSS 파일 분리

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">📊 Trigger</div>
        <ul className="nav-menu">
          <li>
            <Link to="/household">가계부</Link>
          </li>
          <li>
            <Link to="/stock/recommend">종목추천</Link>
          </li>
          <li>
            <Link to="/favorites">관심종목</Link>
          </li>
        </ul>
        <div className="nav-login">
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
