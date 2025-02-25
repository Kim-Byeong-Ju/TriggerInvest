import { useState, useEffect } from "react";
import axios from "axios";

const BASEURL = 'http://localhost:3000/api/v1/stocks/stock-price/';

const useFetchStockData = (stockCode) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASEURL);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stockCode]);

  return { data };
};

export default useFetchStockData;