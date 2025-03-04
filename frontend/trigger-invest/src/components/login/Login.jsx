import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동을 위한 useNavigate 추가
import "./login.css";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { id, password });

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          id,
          password,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      console.log("로그인 성공:", response.data);
      window.alert("로그인 성공");
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.userName);

      // ✅ 로그인 이벤트 발생 → Nav에서 감지
      window.dispatchEvent(new Event("userLogin"));

      // ✅ 1초 후 가계부 페이지(`/household`)로 이동
      navigate("/household");
    } catch (error) {
      console.error(
        "로그인 실패:",
        error.response?.data?.message || "서버 오류"
      );
      alert("로그인 실패: " + (error.response?.data?.message || "서버 오류"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">로그인</h1>

        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label" htmlFor="id">
            아이디
          </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="login-input"
            required
          />

          <label className="login-label" htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
