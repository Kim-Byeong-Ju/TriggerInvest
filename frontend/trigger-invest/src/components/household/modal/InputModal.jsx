import React, { useState, useEffect } from "react";
import "./inputmodal.css"; // 모달 스타일을 위한 CSS 파일을 따로 만듭니다.

const categories = [
  { id: "식비", label: "🍔 식비" },
  { id: "교통비", label: "🚗 교통비" },
  { id: "미용", label: "💇 미용" },
  { id: "쇼핑", label: "🛍 쇼핑" },
  { id: "문화생활", label: "🎭 문화생활" },
  { id: "기타", label: "📌 기타" },
];

const InputModal = ({ show, handleClose, handleSave }) => {
  const [step, setStep] = useState(1); // 현재 단계 (1: 기본 정보 입력, 2: 카테고리 선택)
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // 오늘 날짜 기본값 설정 (YYYY-MM-DD)
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category) => {
    setExpense((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleNext = () => {
    if (!expense.title || !expense.amount || !expense.date) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.category) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    handleSave(expense);
    handleClose();
  };

  useEffect(() => {
    if (!show) {
      setStep(1);
      setExpense({
        title: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div onClick={handleClose} className="close-button">
          X
        </div>
        <h2>나의 지출 내역</h2>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            // **1단계: 기본 정보 입력**
            <>
              <label>
                항목:
                <input
                  type="text"
                  name="title"
                  value={expense.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                금액:
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                날짜:
                <input
                  type="date"
                  name="date"
                  value={expense.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="next-button">
                <button type="button" onClick={handleNext}>
                  다음
                </button>
              </div>
            </>
          ) : (
            // **2단계: 카테고리 선택 (버튼 UI)**
            <>
              <p>카테고리를 선택하세요:</p>
              <div className="category-container">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-btn ${
                      expense.category === cat.id ? "selected" : ""
                    }`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setStep(1)}>
                  이전
                </button>
                <button type="submit">저장</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default InputModal;
