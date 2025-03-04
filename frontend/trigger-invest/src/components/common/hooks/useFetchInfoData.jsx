import { useState, useEffect } from "react";
import axios from "axios";

const BASEURL = 'http://localhost:8080';
// const BASEURL = 'http://localhost:3000/api/stocks';

const useFetchInfoData = (stockCode) => {
  const [infoData, setInfoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASEURL + "/info", {
          params: {
            stockCode: stockCode
          }
        });
        setInfoData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stockCode]);

  return { infoData };
};

export default useFetchInfoData;