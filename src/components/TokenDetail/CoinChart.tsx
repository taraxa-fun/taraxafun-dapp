"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from "lightweight-charts";
import { useSingleTokenStore } from "@/store/SingleToken/useSingleTokenStore";
import { getCandles } from "@/utils/getCandles";
import { formatEther } from "viem";
import { useWebSocketCandlesStore, WebSocketCandle } from "@/store/WS/useWebSocketCandlesStore";

interface CandleData {
  open: bigint;
  high: bigint;
  low: bigint;
  close: bigint;
  time: string;
}

const CoinChart: React.FC = () => {
  const { tokenData } = useSingleTokenStore();
  const { latestCandle1m, initWebSockets, cleanup } = useWebSocketCandlesStore();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<"1m" | "5m">("1m");
  const [chartData, setChartData] = useState<CandlestickData<Time>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Formatage des données en fonction de la source
  const formatCandle = (candle: CandleData | WebSocketCandle): CandlestickData<Time> => ({
    time: "time" in candle
      ? Math.floor(parseInt(candle.time) / 1000) as Time // API (getCandles)
      : Math.floor(new Date(candle.startTime).getTime() / 1000) as Time, // WebSocket
    open: parseFloat(formatEther(BigInt(candle.open))),
    high: parseFloat(formatEther(BigInt(candle.high))),
    low: parseFloat(formatEther(BigInt(candle.low))),
    close: parseFloat(formatEther(BigInt(candle.close))),
  });

  // Récupération initiale des données
  const fetchData = async () => {
    if (!tokenData?.address || !seriesRef.current) return;

    try {
      setIsLoading(true);
      const candles: CandleData[] = await getCandles(tokenData.address);
      const formattedData = candles.map(formatCandle);

      // Tri des données par ordre croissant de temps
      formattedData.sort((a, b) => (a.time as number) - (b.time as number));

      setChartData(formattedData);
      seriesRef.current.setData(formattedData);
      chartRef.current?.timeScale().fitContent();
    } catch (error) {
      console.error("Error fetching or formatting candle data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: "white",
        background: { type: ColorType.Solid, color: "#16092F" },
      },
      grid: {
        vertLines: { color: "#3B2948", style: 1 },
        horzLines: { color: "#3B2948", style: 1 },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      rightPriceScale: {
        visible: true,
        borderColor: '#3B2948',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      priceFormat: {
        type: 'price',
        precision: 12, 
        minMove: 1e-12, 
      },
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  // Gestion des WebSockets
  useEffect(() => {
    if (!tokenData?.address) return;

    fetchData();

    if (selectedInterval === "1m") {
      initWebSockets(); 
    } else if (selectedInterval === "5m") {
      initWebSockets(); 
    }

    return () => {
      cleanup(); 
    };
  }, [tokenData, selectedInterval]);

  useEffect(() => {
    const latestCandle = selectedInterval === "1m" ? latestCandle1m : null;
    if (latestCandle) {

      const newCandle = formatCandle(latestCandle);
      setChartData((prevData) => {
        const existingIndex = prevData.findIndex(
          (candle) => candle.time === newCandle.time
        );

        const updatedData = [...prevData];

        if (existingIndex !== -1) {

          updatedData[existingIndex] = newCandle;
        } else {

          updatedData.push(newCandle);
        }


        updatedData.sort((a, b) => (a.time as number) - (b.time as number));

        return updatedData;
      });
    }
  }, [latestCandle1m, selectedInterval]);

  useEffect(() => {
    if (seriesRef.current && chartData.length > 0) {
      seriesRef.current.setData(chartData);
      console.log(chartData, "chart data");
    }
  }, [chartData]);

  return (
    <div>
      <div className="flex justify-start gap-4 mb-4">
        <button
          onClick={() => setSelectedInterval("1m")}
          className={`px-4 py-2 rounded-lg ${
            selectedInterval === "1m"
              ? "bg-[#9A62FF] text-white"
              : "bg-[#9A62FF] text-white opacity-50"
          }`}
        >
          1m
        </button>
        <button
          onClick={() => setSelectedInterval("5m")}
          className={`px-4 py-2 rounded-lg ${
            selectedInterval === "5m"
              ? "bg-[#9A62FF] text-white"
              : "bg-[#9A62FF] text-white opacity-50"
          }`}
        >
          5m
        </button>
      </div>
      {isLoading && <div className="text-white">Loading...</div>}
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};

export default CoinChart;
