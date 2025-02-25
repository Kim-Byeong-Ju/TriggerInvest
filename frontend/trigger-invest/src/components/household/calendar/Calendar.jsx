import React, { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import InputModal from "@/components/household/modal/InputModal";
import EventListModal from "@/components/household/modal/EventListModal"; // 새로 추가된 모달
import "@fullcalendar/core/locales/ko";
import "@/pages/household.css";
import "./calendar.css";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showEventListModal, setShowEventListModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();

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

  // 2월 총 지출액 계산
  const totalExpense = useMemo(() => {
    return events.reduce((sum, event) => {
      const amount = parseInt(
        event.title.split(" - ")[1]?.replace("원", ""),
        10
      );
      return isNaN(amount) ? sum : sum + amount;
    }, 0);
  }, [events]);

  // FullCalendar에서 view의 title 값 가져오기
  const handleViewRender = (view) => {
    const endDate = view.end;
    // 저장
    setCurrentMonth(endDate);
  };

  return (
    <div className="calendar">
      {/* 툴바 아래에 총 지출액 표시 */}
      <div className="total-expense">
        <strong>
          {currentMonth} 총 지출액: {totalExpense} 원
        </strong>
      </div>
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
        // view 변경 시 호출되는 콜백
        viewDidMount={handleViewRender}
        datesSet={handleViewRender} // 달력이 렌더링될 때마다 호출되는 콜백
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
