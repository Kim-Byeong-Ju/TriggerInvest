import { useParams } from "react-router-dom";
import Chart from '../components/stockDetail/Chart';
import { useEffect, useState } from "react";
import { COLORS } from "../components/common/utils";
import useFetchChartData from "../components/common/hooks/useFetchChartData";
import useFetchInfoData from "../components/common/hooks/useFetchInfoData";
import useFetchCurrentData from "../components/common/hooks/useFetchCurrentData";
import Info from "../components/stockDetail/Info";

function StockDetailPage() {
    const { stockCode } = useParams();
    const { chartData } = useFetchChartData(stockCode);
    const { infoData } = useFetchInfoData(stockCode);
    const { currentData } = useFetchCurrentData(stockCode);

    // Chart
    const [stockData, setStockData] = useState(null);
    const [volumeData, setVolumeData] = useState(null);

    // Info
    const [stockInfoData, setStockInfoData] = useState(null);

    // Current
    const [stockCurrentData, setStockCurrentData] = useState(null);

    useEffect(() => {
        if (!chartData) return;

        const updatedStockData = chartData.map((item) => ({
            time: item.date,
            open: item.open_price,
            close: item.closed_price,
            high: item.high_price,
            low: item.low_price,
        }));

        const updatedVolumeData = chartData.map((item, index) => {
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
                color: chartData[index].volume >= chartData[index - 1].volume ? COLORS.positive : COLORS.negative,
            }
        }
        );

        setStockData(updatedStockData);
        setVolumeData(updatedVolumeData);
    }, [chartData])

    useEffect(() => {
        if (!infoData) return;

        setStockInfoData(infoData);
    }, [infoData])

    // Current
    useEffect(() => {
        if (!currentData) return;

        setStockCurrentData(currentData);
    }, [currentData])

    if (!stockData || !volumeData || !stockInfoData || !stockCurrentData) return;

    return (
        <>
            <Info infoData={stockInfoData} currentData={stockCurrentData} />
            <Chart stockData={stockData} volumeData={volumeData} />
        </>
    );
}

export default StockDetailPage;