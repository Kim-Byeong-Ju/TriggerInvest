import React from "react";
import "./modal.css"; // 스타일링을 위한 CSS 파일 추가

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
};

export default Modal;
