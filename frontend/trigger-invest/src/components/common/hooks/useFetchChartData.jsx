import { useState, useEffect } from "react";
import axios from "axios";

const BASEURL = 'http://localhost:3000/api/stocks/stock-price/';

const useFetchChartData = (stockCode) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASEURL);
        setChartData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stockCode]);

  return { chartData };
};

export default useFetchChartData;