import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchVolumeRankData = () => {
  const [volumeRankData, setVolumeRankData] = useState(null);

  const fetchVolumeRankData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("stocks/volume-rank");

      setVolumeRankData(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchVolumeRankData();
  }, [fetchVolumeRankData]);

  return { volumeRankData };
};

export default useFetchVolumeRankData;
