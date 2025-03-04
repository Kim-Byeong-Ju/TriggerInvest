import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASEURL = "http://localhost:8080/household";

const useFetchHousehold = (userId) => {
  const [events, setEvents] = useState([]);

  // 데이터를 가져오는 함수
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(BASEURL, {
        params: { userId },
      });
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);

  return { events, setEvents };
};

export default useFetchHousehold;
