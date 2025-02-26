import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchSearchRankData = () => {
  const [searchRankData, setSearchRankData] = useState(null);

  const fetchSearchRankData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("stocks/search-rank");

      setSearchRankData(response.data.output1);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSearchRankData();
  }, [fetchSearchRankData]);

  return { searchRankData };
};

export default useFetchSearchRankData;
