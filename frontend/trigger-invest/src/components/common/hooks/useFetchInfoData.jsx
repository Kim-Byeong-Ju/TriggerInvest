import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});

const useFetchInfoData = (stockCode) => {
  const [infoData, setInfoData] = useState(null);

  const fetchInfoData = useCallback(async () => {
    if (!stockCode) return;

    try {
      const response = await axiosInstance.get("stocks/stock-info", {
        params: { stockCode },
      });

      setInfoData({
        prdt_abrv_name: response.data.output.prdt_abrv_name,  // 상품약어명
        prdt_eng_abrv_name: response.data.output.prdt_eng_abrv_name,  // 상품영문약어명명
        std_idst_clsf_cd_name: response.data.output.std_idst_clsf_cd_name, // 표준산업분류코드명
      });
    } catch (error) {
      console.error(error);
    }
  }, [stockCode]);

  useEffect(() => {
    fetchInfoData();
  }, [fetchInfoData]);

  return { infoData };
};

export default useFetchInfoData;
