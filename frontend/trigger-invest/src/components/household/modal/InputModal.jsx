import React, { useState, useEffect } from "react";
import "./inputmodal.css"; // 모달 스타일

const categories = [
  { id: 1, label: "🍔 식비" },
  { id: 2, label: "🔌 가전제품" },
  { id: 3, label: "🐶 애완동물" },
  { id: 4, label: "📡 인터넷/TV 요금" },
  { id: 5, label: "💰 세금/보험료" },
  { id: 6, label: "🚗 차량 유지비" },
  { id: 7, label: "🛋 가구/인테리어" },
  { id: 8, label: "☕ 커피" },
  { id: 9, label: "🍻 술" },
  { id: 10, label: "🚌 교통비" },
  { id: 11, label: "📺 컨텐츠 소비" },
  { id: 12, label: "⚽ 스포츠" },
  { id: 13, label: "🛍 쇼핑" },
  { id: 14, label: "🎮 게임" },
  { id: 15, label: "💄 미용(화장품)" },
  { id: 16, label: "📖 교육" },
  { id: 17, label: "🏦 저축" },
  { id: 18, label: "🩺 의료/건강" },
  { id: 19, label: "📞 통신비" },
  { id: 20, label: "✈️ 여행" },
  { id: 21, label: "🎊 경조사" },
  { id: 22, label: "🏠 주거비" },
  { id: 23, label: "🧴 생필품" },
];

const InputModal = ({ show, handleClose, handleSave }) => {
  const [step, setStep] = useState(1);
  const userId = localStorage.getItem("userId");
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    transactionDate: new Date().toISOString().split("T")[0],
    userId: userId,
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
      sectorId: category,
    }));
  };

  const handleNext = () => {
    if (!expense.title || !expense.amount || !expense.transactionDate) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.sectorId) {
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
        userId: userId,
        title: "",
        amount: "",
        transactionDate: new Date().toISOString().split("T")[0],
        sectorId: "",
      });
    }
  }, [show]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <h2>나의 지출 내역</h2>
              <div className="form-group">
                <label>항목</label>
                <input
                  type="text"
                  name="title"
                  value={expense.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>금액</label>
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>날짜</label>
                <input
                  type="date"
                  name="transactionDate"
                  value={expense.transactionDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="next-button"
                  onClick={handleNext}
                >
                  다음
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>항목 카테고리 선택</h2>
              <div className="category-container">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-btn ${
                      expense.sectorId === cat.id ? "selected" : ""
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
