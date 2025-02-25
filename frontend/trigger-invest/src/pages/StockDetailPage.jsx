import { useParams } from "react-router-dom";
import Chart from '../components/stockDetail/Chart';
import { useEffect, useState } from "react";
import useFetchStockData from '../components/common/hooks/useFetchStockData';
import { COLORS } from "../components/common/utils";

function StockDetailPage() {
    const { stockCode } = useParams();
    const { data } = useFetchStockData(stockCode);

    // Chart
    const [stockData, setStockData] = useState(null);
    const [volumeData, setVolumeData] = useState(null);

    // In

    useEffect(() => {
        if (!data) return;

        const updatedStockData = data.map((item) => ({
            time: item.date,
            open: item.open_price,
            close: item.closed_price,
            high: item.high_price,
            low: item.low_price,
        }));

        const updatedVolumeData = data.map((item, index) => {
            if (index === 0) {
                return {
                    time: item.date,
                    value: item.volume,
                    color: COLORS.positive
                }
            }
            return {
                time: item.date,
                value: item.volume,
                color: data[index].volume >= data[index - 1].volume ? COLORS.positive : COLORS.negative,
            }
        }
        );

        setStockData(updatedStockData);
        setVolumeData(updatedVolumeData);
    }, [data])

    if (!stockData || !volumeData) return;

    return (
        <Chart stockData={stockData} volumeData={volumeData} />
    );
}

export default StockDetailPage;