import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  ColorType, 
  createChart, 
  type IChartApi, 
  type ISeriesApi,
  type Time,
  type CandlestickData
} from 'lightweight-charts';

export const CoinChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [interval, setInterval] = useState<'1' | '5'>('1');

  const generateData = useCallback((interval: '1' | '5'): CandlestickData<Time>[] => {
    const data: CandlestickData<Time>[] = [];
    const intervalMinutes = parseInt(interval);
    const now = Math.floor(Date.now() / 1000);
    let lastClose = 0.00015;

    for (let i = 100; i >= 0; i--) {
      const timestamp = now - (i * intervalMinutes * 60);
      const change = (Math.random() - 0.5) * 0.00000005;
      const open = lastClose;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 0.00000002;
      const low = Math.min(open, close) - Math.random() * 0.00000002;
      
      data.push({
        time: timestamp as Time,
        open: parseFloat(open.toFixed(8)),
        high: parseFloat(high.toFixed(8)),
        low: parseFloat(low.toFixed(8)),
        close: parseFloat(close.toFixed(8)),
      });

      lastClose = close;
    }

    return data;
  }, []);

  const initChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    // Créez un nouveau graphique
    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: 'white',
        background: { 
          type: ColorType.Solid, 
          color: '#110724' 
        }
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: Time) => {
          const date = new Date(Number(time) * 1000);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
        }
      },
      width: chartContainerRef.current.clientWidth,
      height: 500
    });

    // Ajouter la série des chandeliers
    const series = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      priceFormat: {
        type: 'price',
        precision: 8,
        minMove: 0.00000001,
      }
    });

    // Charger les données en fonction de l'intervalle
    const data = generateData(interval);
    series.setData(data);
    chart.timeScale().fitContent();

    // Sauvegarder les références pour le nettoyage
    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, [interval, generateData]);

  useEffect(() => {
    const cleanup = initChart();
    
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup?.();
      window.removeEventListener('resize', handleResize);
    };
  }, [interval, initChart]);

  const handleIntervalChange = (newInterval: '1' | '5') => {
    setInterval(newInterval);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end p-4">
        <div className="flex gap-2 bg-[#1e1e1e] rounded-lg p-1">
          <button
            onClick={() => handleIntervalChange('1')}
            className={`px-4 py-2 rounded-md transition-colors ${
              interval === '1'
                ? "bg-[#9A62FF] text-white"
                : "bg-[#9A62FF] text-white opacity-50"
            }`}
          >
            1m
          </button>
          <button
            onClick={() => handleIntervalChange('5')}
            className={`px-4 py-2 rounded-md transition-colors ${
              interval === '5'
                ? "bg-[#9A62FF] text-white"
                :"bg-[#9A62FF] text-white opacity-50"
            }`}
          >
            5m
          </button>
        </div>
      </div>
      <div 
        ref={chartContainerRef} 
        className="w-full h-[500px]"
      />
    </div>
  );
};

export default CoinChart;
