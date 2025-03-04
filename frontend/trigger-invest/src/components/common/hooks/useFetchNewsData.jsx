import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchNewsData = (stockCode) => {
  const [newsData, setNewsData] = useState(null);

  const fetchNewsData = useCallback(async () => {
    if (!stockCode) return;

    try {
      const response = await axiosInstance.get("stocks/news", {
        params: { stockCode },
      });

      setNewsData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, [stockCode]);

  useEffect(() => {
    fetchNewsData();
  }, [fetchNewsData]);

  return { newsData };
};

export default useFetchNewsData;
