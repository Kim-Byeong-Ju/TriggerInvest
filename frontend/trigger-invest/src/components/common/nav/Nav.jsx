import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(!!userId);
    };

    checkLoginStatus();

    window.addEventListener("userLogin", checkLoginStatus);
    window.addEventListener("userLogout", checkLoginStatus);

    return () => {
      window.removeEventListener("userLogin", checkLoginStatus);
      window.removeEventListener("userLogout", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/login");
  };

  const goToMain = () => {
    navigate("/household");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo" onClick={goToMain}>
          <img src="/logo.png" alt="Logo" className="nav-logo-img" />
          <span className="nav-logo-text">TRIGGER</span>
        </div>
        <ul className="nav-menu">
          <li><Link to="/household">소비내역</Link></li>
          <li><Link to="/stock/recommend">종목추천</Link></li>
        </ul>
        <div className="nav-login">
          {!isLoggedIn ? (
            <Link to="/login" className="login-btn">로그인</Link>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
