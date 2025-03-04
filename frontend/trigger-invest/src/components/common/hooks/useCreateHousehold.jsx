import { useState, useCallback } from "react";
import axios from "axios";

const BASEURL = "http://localhost:8080/household";

const useCreateHousehold = (setEvents) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // POST 요청을 보내는 함수
  const createExpense = useCallback(
    async (expense) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(BASEURL, expense);
        console.log(response.data)
        setEvents(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setEvents]
  );
  return { createExpense, loading, error };
};

export default useCreateHousehold;
