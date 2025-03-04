import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchFluctuationUpRankData = () => {
  const [fluctuationUpRankData, setFluctuationUpRankData] = useState(null);

  const fetchFluctuationUpRankData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("stocks/fluctuation-up-rank");

      setFluctuationUpRankData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFluctuationUpRankData();
  }, [fetchFluctuationUpRankData]);

  return { fluctuationUpRankData };
};

export default useFetchFluctuationUpRankData;
