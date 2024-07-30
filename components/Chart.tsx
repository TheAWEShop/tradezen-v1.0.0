'use client';
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

interface ChartProps {
    data: any[];
}

const Charts: React.FC<ChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Create the chart
        const chart = createChart(chartContainerRef.current, { 
            width: chartContainerRef.current.clientWidth, 
            height: chartContainerRef.current.clientHeight || 700 // Default height if undefined
        });
        chartRef.current = chart;

        // Add candlestick series
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#008a00', 
            downColor: '#e40000', 
            borderVisible: false,
            wickUpColor: '#008a00', 
            wickDownColor: '#e40000',
        });

        chart.timeScale().fitContent();
        candlestickSeries.setData(data);

        // Resize observer to handle dynamic height changes
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.contentBoxSize) {
                    const { width, height } = entry.contentRect;
                    chart.applyOptions({ width, height });
                }
            }
        });

        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [data]);

    return (
        <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
    );
};

export default Charts;
