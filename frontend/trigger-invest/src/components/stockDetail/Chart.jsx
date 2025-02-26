import { useEffect, useRef } from "react";
import { createChart, ColorType } from 'lightweight-charts';
import { COLORS } from '../common/utils';

function Chart({ stockData, volumeData }) {
    const chartContainerRef = useRef(null);
    const candlestickSeriesRef = useRef(null);
    const histogramSeriesRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chartOptions = {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: { textColor: 'white', background: { type: ColorType.Solid, color: '#252525' } },
            grid: {
                vertLines: { color: 'rgba(105, 105, 105, 0.5)' },
                horzLines: { color: 'rgba(105, 105, 105, 0.5)' },
            },
            crosshair: {
                mode: 0,
            },
        };

        const chart = createChart(chartContainerRef.current, chartOptions);

        // 주가 캔들 차트
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: COLORS.positive,
            downColor: COLORS.negative,
            wickUpColor: COLORS.positive,
            wickDownColor: COLORS.negative,
            borderVisible: false,
        });
        candlestickSeries.setData(stockData);

        // 거래량 히스토그램 차트
        const histogramSeries = chart.addHistogramSeries({
            priceScaleId: 'volume',
        });
        chart.priceScale('volume').applyOptions({
            scaleMargins: {
                top: 0.9,
                bottom: 0,
            },
        });
        histogramSeries.setData(volumeData);

        // 참조 저장
        candlestickSeriesRef.current = candlestickSeries;
        histogramSeriesRef.current = histogramSeries;

        chart.timeScale().fitContent();

        return () => {
            chart.remove();
        };
    }, [stockData]);

    return (
        <>
            <div ref={chartContainerRef} style={{ width: '800px', height: '500px' }} />
        </>
    );
}

export default Chart;
