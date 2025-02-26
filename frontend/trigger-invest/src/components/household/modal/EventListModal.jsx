import React from "react";
import "./eventlistmodal.css"; // 스타일 추가

const EventListModal = ({ show, handleClose, events, date }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div onClick={handleClose} className="close-button">
          X
        </div>
        <h2>{date} 지출 내역</h2>

        {events.length > 0 ? (
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>지출 내역이 없습니다.</p>
        )}

        <button onClick={handleClose} className="modal-close-btn">
          닫기
        </button>
      </div>
    </div>
  );
};

export default EventListModal;
