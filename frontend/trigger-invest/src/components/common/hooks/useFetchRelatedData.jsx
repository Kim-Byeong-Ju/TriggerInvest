import { useState, useEffect } from "react";
import axios from "axios";

const BASEURL = 'http://localhost:8080';
// const BASEURL = 'http://localhost:3000/api/stocks';

const useFetchRelatedData = (stockCode) => {
  const [relatedData, setRelatedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASEURL + "/related", {
          params: {
            stockCode: stockCode
          }
        });
        setRelatedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stockCode]);

  return { relatedData };
};

export default useFetchRelatedData;