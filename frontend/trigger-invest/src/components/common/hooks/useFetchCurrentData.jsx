import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchCurrentData = (stockCode) => {
  const [currentData, setcurrentData] = useState(null);

  const fetchCurrentData = useCallback(async () => {
    if (!stockCode) return;

    try {
      const response = await axiosInstance.get("stocks/current-price", {
        params: { stockCode }
      });

      setcurrentData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, [stockCode]);

  useEffect(() => {
    fetchCurrentData();
  }, [fetchCurrentData]);

  return { currentData };
};

export default useFetchCurrentData;
