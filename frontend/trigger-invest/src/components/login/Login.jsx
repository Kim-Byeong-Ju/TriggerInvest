import React, { useState } from "react";
import "./login.css"; // ✅ CSS 파일 불러오기
import axios from "axios";

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("로그인 시도:", { id, password });
        try {
            const response = await axios.post("http://localhost:8080/login", {
                id,
                password
            });

            console.log("로그인 성공:", response.data);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("로그인 실패:", error.response?.data?.message || "서버 오류");
            alert("로그인 실패: " + (error.response?.data?.message || "서버 오류"));
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">로그인</h1>

                <form onSubmit={handleLogin} className="login-form">
                    <label className="login-label" htmlFor="id">ID</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="login-input"
                        required
                    />

                    <label className="login-label" htmlFor="password">PW</label>
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
