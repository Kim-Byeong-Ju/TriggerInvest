import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/locales/ko"; // 한국어 로케일 추가
import "@/pages/household.css";
function Calendar() {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt("Enter expense details:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        locale="ko"
      />
    </div>
  );
}

export default Calendar;
