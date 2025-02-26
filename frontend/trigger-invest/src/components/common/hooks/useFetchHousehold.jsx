import { useState, useEffect } from "react";
import axios from "axios";

const BASEURL = "http://localhost:8080/household";

const useFetchHousehold = (userId) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASEURL, {
          params: { userId },
        });
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return { events };
};

export default useFetchHousehold;
