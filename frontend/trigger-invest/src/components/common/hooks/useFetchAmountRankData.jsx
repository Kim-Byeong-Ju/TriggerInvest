import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchAmountRankData = () => {
  const [amountRankData, setAmountRankData] = useState(null);

  const fetchAmountRankData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("stocks/amount-rank");

      setAmountRankData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAmountRankData();
  }, [fetchAmountRankData]);

  return { amountRankData };
};

export default useFetchAmountRankData;
