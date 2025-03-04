import React from "react";
import "./eventlistmodal.css"; // 스타일 적용

const EventListModal = ({ show, handleClose, events, date }) => {
  if (!show) return null;

  // 모달 바깥을 클릭하면 닫히도록 설정
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>X</button>
        <h2>{date} 소비 내역</h2>

        {events.length > 0 ? (
          <div className="table-container">
            <table className="event-table">
              <thead>
                <tr>
                  <th>항목</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.title}</td>
                    <td>{event.amount.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-events">지출 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default EventListModal;
