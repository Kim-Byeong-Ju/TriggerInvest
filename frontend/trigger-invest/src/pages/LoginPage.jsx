import React, { useEffect } from "react";
import Login from "../components/login/Login";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("userId");
        if (userData) {
            navigate('/household');
        }
    }, []);

    return (
        <div>
            <Login />
        </div>
    );
}

export default LoginPage;