import { useNavigate } from "react-router-dom";
import Calendar from "../components/household/calendar/Calendar";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useFetchHousehold from "@/components/common/hooks/useFetchHousehold";
import AnalysisModal from "@/components/household/modal/AnalysisModal";
import "./household.css";
function HouseholdPage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const { events, setEvents } = useFetchHousehold(userId);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const handleCloseAnalysisModal = () => {
    setShowAnalysisModal(false);
  };
  useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="household-page">
        <div className="title-container">
          <div className="title">
            {userName}님의 소비내역
            <FaSearch onClick={() => setShowAnalysisModal(true)} />
          </div>
        </div>

        <AnalysisModal
          show={showAnalysisModal}
          handleClose={handleCloseAnalysisModal}
          events={events}
        />
        <Calendar events={events} setEvents={setEvents} />
      </div>
    </>
  );
}

export default HouseholdPage;
