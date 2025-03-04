import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { COLORS } from "../components/common/utils";
import useFetchChartData from "../components/common/hooks/useFetchChartData";
import useFetchSymbolData from "../components/common/hooks/useFetchSymbolData";
import useFetchCurrentData from "../components/common/hooks/useFetchCurrentData";
import useFetchInfoData from "../components/common/hooks/useFetchInfoData";
import useFetchRelatedData from "../components/common/hooks/useFetchRelatedData";
import Symbol from "../components/stockDetail/Symbol";
import Info from "../components/stockDetail/Info";
import Chart from "../components/stockDetail/Chart";
import "./StockDetail.css";
import useFetchNewsData from "../components/common/hooks/useFetchNewsData";

function StockDetailPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("userId");
        if (!userData) {
            navigate('/login');
        }
    }, []);

    const { stockCode } = useParams();
    const { chartData } = useFetchChartData(stockCode);
    const { symbolData } = useFetchSymbolData(stockCode);
    const { currentData } = useFetchCurrentData(stockCode);
    const { infoData } = useFetchInfoData(stockCode);
    const { newsData } = useFetchNewsData(stockCode);
    const { relatedData } = useFetchRelatedData(stockCode);

    const [stockData, setStockData] = useState(null);
    const [volumeData, setVolumeData] = useState(null);
    const [stockSymbolData, setStockSymbolData] = useState(null);
    const [stockCurrentData, setStockCurrentData] = useState(null);
    const [stockInfoData, setStockInfoData] = useState(null);
    const [stockNewsData, setStockNewsData] = useState(null);
    const [stockRelatedData, setStockRelatedData] = useState(null);

    useEffect(() => {
        if (!chartData) return;
        setStockData(chartData.map((item) => ({
            time: item.historyDate,
            open: item.openPrice,
            close: item.closedPrice,
            high: item.highPrice,
            low: item.lowPrice,
        })));
        setVolumeData(chartData.map((item, index) => ({
            time: item.historyDate,
            value: item.volume,
            color: index === 0 || chartData[index].volume >= chartData[index - 1].volume
                ? COLORS.positive
                : COLORS.negative,
        })));
    }, [chartData]);

    useEffect(() => {
        if (!symbolData) return;
        setStockSymbolData(symbolData);
    }, [symbolData]);

    useEffect(() => {
        if (!currentData) return;
        setStockCurrentData(currentData);
    }, [currentData]);

    useEffect(() => {
        if (!infoData || !newsData || !relatedData) return;
        setStockInfoData(infoData);
        setStockNewsData(newsData);
        setStockRelatedData(relatedData);
    }, [infoData, newsData, relatedData]);

    if (!stockData || !volumeData || !stockSymbolData || !stockCurrentData || !stockInfoData || !stockNewsData || !relatedData) return;

    return (
        <div className="stock-detail-container">
            <div className="symbol-container">
                <Symbol symbolData={stockSymbolData} currentData={stockCurrentData} />
            </div>
            <div className="content-container">
                <div className="info-container">
                    <Info infoData={stockInfoData} newsData={stockNewsData} relatedData={stockRelatedData} />
                </div>
                <div className="chart-container">
                    <Chart stockData={stockData} volumeData={volumeData} />
                </div>
            </div>
        </div>
    );
}

export default StockDetailPage;
