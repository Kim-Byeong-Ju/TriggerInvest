import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import InputModal from "@/components/household/modal/InputModal";
import EventListModal from "@/components/household/modal/EventListModal"; // 새로 추가된 모달
import "@fullcalendar/core/locales/ko";
import "@/pages/household.css";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showEventListModal, setShowEventListModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);

  // 날짜 클릭 시 해당 날짜의 이벤트 목록 모달 열기
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const filteredEvents = events.filter((event) => event.date === clickedDate);

    setSelectedDate(clickedDate);
    setSelectedEvents(filteredEvents);
    setShowEventListModal(true);
  };

  // 항목 추가 버튼 클릭 시 모달 열기
  const handleButtonClick = () => {
    setShowInputModal(true);
  };

  // 모달 닫기
  const handleCloseInputModal = () => {
    setShowInputModal(false);
  };
  const handleCloseEventListModal = () => {
    setShowEventListModal(false);
  };

  // 지출 내역 저장
  const handleSaveExpense = (expense) => {
    const newEvent = {
      title: `${expense.title} - ${expense.amount}원`,
      date: expense.date, // 사용자가 선택한 날짜 반영
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        locale="ko"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "customButton",
        }}
        customButtons={{
          customButton: {
            text: "항목 추가",
            click: handleButtonClick,
          },
        }}
      />

      {/* 지출 입력 모달 */}
      <InputModal
        show={showInputModal}
        handleClose={handleCloseInputModal}
        handleSave={handleSaveExpense}
      />

      {/* 날짜별 이벤트 목록 모달 */}
      <EventListModal
        show={showEventListModal}
        handleClose={handleCloseEventListModal}
        events={selectedEvents}
        date={selectedDate}
      />
    </div>
  );
}

export default Calendar;
