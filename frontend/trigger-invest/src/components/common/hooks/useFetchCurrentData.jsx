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

      setcurrentData({
        stck_prpr: parseInt(response.data.output.stck_prpr),  // 주식 현재가
        prdy_vrss:parseInt(response.data.output.prdy_vrss),  // 전일 대비
        prdy_ctrt: parseFloat(response.data.output.prdy_ctrt),  // 전일 대비율
        prdy_vrss_sign: response.data.output.prdy_vrss_sign,  // 전일 대비 부호(2: 상승, 5: 하락)
      });
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
