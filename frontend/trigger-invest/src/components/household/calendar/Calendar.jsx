import React, { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import InputModal from "@/components/household/modal/InputModal";
import EventListModal from "@/components/household/modal/EventListModal"; // 새로 추가된 모달
import useFetchHousehold from "@/components/common/hooks/useFetchHousehold";
import "@fullcalendar/core/locales/ko";
import "@/pages/household.css";
import "./calendar.css";

function Calendar() {
  // const userId = "qudwn2941";
  // const [events, setEvents] = useState(useFetchHousehold(userId));
  const [events, setEvents] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showEventListModal, setShowEventListModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
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

  const totalExpense = useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return (
          (eventDate.getFullYear() === currentYear) &
          (eventDate.getMonth() + 1 === currentMonth)
        ); // 현재 선택된 월과 일치하는 이벤트만 필터링
      })
      .reduce((sum, event) => {
        const amount = parseInt(
          event.title.split(" - ")[1]?.replace("원", ""),
          10
        );
        return isNaN(amount) ? sum : sum + amount;
      }, 0);
  }, [events, currentMonth, currentYear]); // currentMonth가 변경될 때마다 계산되도록 의존성 추가

  // FullCalendar에서 view의 title 값 가져오기
  const handleViewRender = (view) => {
    const date = view.view.title;
    const [year, month] = date
      .replace("년", "")
      .replace("월", "")
      .split(" ")
      .map(Number);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return (
    <div className="calendar">
      {/* 툴바 아래에 총 지출액 표시 */}
      <div className="total-expense">
        <strong>
          {currentMonth}월 총 지출액: {totalExpense}원
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
