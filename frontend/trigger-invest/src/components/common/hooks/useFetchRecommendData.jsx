import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASEURL = "http://localhost:8080/recommend";

const useFetchRecommendData = (userId) => {
  const [stocks, setStocks] = useState([]);
  // 데이터를 가져오는 함수
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(BASEURL, {
        params: { userId },
      });
      setStocks(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);

  return { stocks };
};

export default useFetchRecommendData;
