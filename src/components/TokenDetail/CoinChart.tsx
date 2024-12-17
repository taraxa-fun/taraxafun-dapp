import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from 'lightweight-charts';

const generateData = (candles: number, intervalMinutes: number): CandlestickData<Time>[] => {
  const now = Math.floor(Date.now() / 1000);
  const data: CandlestickData<Time>[] = [];
  let lastClose = 100;

  for (let i = 0; i < candles; i++) {
    const time = now - i * intervalMinutes * 60;
    const open = lastClose;
    const close = open + (Math.random() - 0.5) * 2;
    const high = Math.max(open, close) + Math.random();
    const low = Math.min(open, close) - Math.random();

    data.unshift({
      time: time as Time,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });

    lastClose = close;
  }

  return data;
};

const CoinChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<'1m' | '5m'>('1m');

  const intervalData = new Map([
    ['1m', generateData(100, 1)],
    ['5m', generateData(100, 5)],
  ]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: 'white',
        background: { type: ColorType.Solid, color: 'black' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    const updateData = () => {
      const newData = generateData(1, selectedInterval === '1m' ? 1 : 5)[0];
      seriesRef.current?.update(newData);
      console.log(newData);
    };

    // Initial data load
    candlestickSeries.setData(intervalData.get(selectedInterval)!);
    chart.timeScale().fitContent();

    const updateInterval = setInterval(updateData, 5000);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [selectedInterval]);

  const updateInterval = (interval: '1m' | '5m') => {
    if (seriesRef.current) {
      seriesRef.current.setData(intervalData.get(interval)!);
      chartRef.current?.timeScale().fitContent();
      setSelectedInterval(interval);
    }
  };


  return (
    <div>
      <div className="buttons-container" style={{ marginBottom: '1rem', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => updateInterval('1m')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: selectedInterval === '1m' ? '#2962FF' : '#F0F3FA',
            color: selectedInterval === '1m' ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          1m
        </button>
        <button
          onClick={() => updateInterval('5m')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: selectedInterval === '5m' ? '#2962FF' : '#F0F3FA',
            color: selectedInterval === '5m' ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          5m
        </button>
      </div>
      <div ref={chartContainerRef} style={{ height: 400 }} />
    </div>
  );
};

export default CoinChart;
