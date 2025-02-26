import Calendar from "../components/household/calendar/Calendar";

function HouseholdPage() {
  return (
    <>
      <div className="household-page">
        <div className="title">지출 캘린더</div>
        <Calendar />
      </div>
    </>
  );
}

export default HouseholdPage;
