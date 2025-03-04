import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchSymbolData = (stockCode) => {
  const [symbolData, setSymbolData] = useState(null);

  const fetchSymbolData = useCallback(async () => {
    if (!stockCode) return;

    try {
      const response = await axiosInstance.get("stocks/symbol", {
        params: { stockCode },
      });

      setSymbolData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, [stockCode]);

  useEffect(() => {
    fetchSymbolData();
  }, [fetchSymbolData]);

  return { symbolData };
};

export default useFetchSymbolData;
