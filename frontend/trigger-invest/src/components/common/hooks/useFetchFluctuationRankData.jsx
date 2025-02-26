import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchFluctuationRankData = () => {
  const [fluctuationRankData, setFluctuationRankData] = useState(null);

  const fetchFluctuationRankData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("stocks/fluctuation-rank");

      setFluctuationRankData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFluctuationRankData();
  }, [fetchFluctuationRankData]);

  return { fluctuationRankData };
};

export default useFetchFluctuationRankData;
