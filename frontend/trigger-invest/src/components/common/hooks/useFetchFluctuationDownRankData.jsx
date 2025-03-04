import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchFluctuationDownRankData = () => {
  const [fluctuationDownRankData, setFluctuationDownRankData] = useState(null);

  const fetchFluctuationDownRankData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("stocks/fluctuation-down-rank");

      setFluctuationDownRankData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFluctuationDownRankData();
  }, [fetchFluctuationDownRankData]);

  return { fluctuationDownRankData };
};

export default useFetchFluctuationDownRankData;
