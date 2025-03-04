import { useEffect, useRef } from "react";
import { createChart, ColorType } from 'lightweight-charts';
import { COLORS } from '../common/utils';

function Chart({ stockData, volumeData }) {
    const chartContainerRef = useRef(null);
    const candlestickSeriesRef = useRef(null);
    const histogramSeriesRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current || !stockData.length) return;

        const chartOptions = {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: { textColor: 'black', background: { type: ColorType.Solid, color: '#FAFAFA' } },
            grid: {
                vertLines: { color: 'rgba(105, 105, 105, 0.5)' },
                horzLines: { color: 'rgba(105, 105, 105, 0.5)' },
            },
            crosshair: {
                mode: 0,
            },
            timeScale: {
                tickMarkFormatter: (time) => {
                    const [year, month, day] = time.split('-');
                    return `${year - 2000}/${month}/${day}`;
                },
            }
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

        // 차트 범위 제한
        const visibleRange = 50;
        const lastIndex = stockData.length - 1;
        const firstIndex = Math.max(lastIndex - visibleRange, 0);
        chart.timeScale().setVisibleRange({
            from: stockData[firstIndex].time,
            to: stockData[lastIndex].time
        });

        // 참조 저장
        candlestickSeriesRef.current = candlestickSeries;
        histogramSeriesRef.current = histogramSeries;

        return () => {
            chart.remove();
        };
    }, [stockData]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />;
}

export default Chart;
