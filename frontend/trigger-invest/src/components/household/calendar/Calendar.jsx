import React, { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import InputModal from "@/components/household/modal/InputModal";
import EventListModal from "@/components/household/modal/EventListModal";
import useFetchHousehold from "@/components/common/hooks/useFetchHousehold";
import useCreateHousehold from "@/components/common/hooks/useCreateHousehold";
import "@fullcalendar/core/locales/ko";
import "@/pages/household.css";
import "./calendar.css";

function Calendar(events) {
  const [formattedEvents, setFormattedEvents] = useState([]);
  const { createExpense } = useCreateHousehold(events.setEvents);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showEventListModal, setShowEventListModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    if (events.events.length > 0) {
      // 1. 날짜 형식 맞추기
      const formatted = events.events.map((event) => ({
        ...event,
        TransactionDate: new Date(event.TransactionDate),
      }));
      setFormattedEvents(formatted);

      // 2. 캘린더 UI에 들어갈 데이터 생성 (최대 3개만 표시)
      const groupedEvents = {};
      events.events.forEach((event) => {
        let eventDate = new Date(event.TransactionDate)
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\./g, "-")
          .replace(/ /g, "")
          .replace(/-$/, ""); // YYYY-MM-DD 형식
        if (!groupedEvents[eventDate]) {
          groupedEvents[eventDate] = [];
        }
        if (groupedEvents[eventDate].length < 3) {
          // 최대 3개 제한
          groupedEvents[eventDate].push(event);
        }
      });

      const formattedEvents = Object.entries(groupedEvents).flatMap(
        ([date, eventList]) => {
          const eventTitles = eventList.map(
            (event) => `${event.amount.toLocaleString()}원`
          );
          return [
            ...eventTitles.map((title, index) => ({
              title: title,
              start: date,
            })),
            ...(eventList.length > 3
              ? [{ title: "...", start: date, moreEvents: true }]
              : []),
          ];
        }
      );

      setCalendarData(formattedEvents);
    }
  }, [events]);

  // 날짜 클릭 시 해당 날짜의 이벤트 목록 모달 열기
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;

    const filteredEvents = formattedEvents.filter((event) => {
      let eventDate = event.TransactionDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .replace(/\./g, "-")
        .replace(/ /g, "")
        .replace(/-$/, "");
      return eventDate === clickedDate;
    });

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
    createExpense(expense);
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarData}
        dateClick={handleDateClick}
        locale="ko"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "customButton",
        }}
        customButtons={{
          customButton: {
            text: "+",
            click: handleButtonClick,
          },
        }}
        datesSet={({ view }) => {
          const [year, month] = view.title
            .replace("년", "")
            .replace("월", "")
            .split(" ")
            .map(Number);
          setCurrentYear(year);
          setCurrentMonth(month);
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
