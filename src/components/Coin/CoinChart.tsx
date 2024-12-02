import Image from "next/image";
import placeHodlerRounded from "../../assets/placeholderRounded.png";
import { useEffect, useRef } from "react";

export const CoinChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "tradingview-widget-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => initializeTradingView();
    } else if (window.TradingView) {
      initializeTradingView();
    }

    function initializeTradingView() {
      if (chartContainerRef.current && window.TradingView) {
        const widget = new window.TradingView.widget({
          autosize: true,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: chartContainerRef.current.id,
        });

        return () => {
          if (widget) {
            widget.remove();
          }
        };
      }
    }
  }, []);
  return (
    <div className="gap-4">
      <div className="flex justify-between">
        <p className="">MEME OF THE YEAR (MEME)</p>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-normal">created by</p>
            <Image
              src={placeHodlerRounded}
              alt="placholder"
              width={12}
              height={12}
            />
            <a href="/profile/0xPumper_001" className="text-xs font-normal">
              0xPumper_001
            </a>
            <p>16mn ago</p>
            <p>market cap: $12.5k</p>
            <p>replies : 12343</p>
          </div>
        </div>
      </div>
      <div
        id="tradingview_chart"
        ref={chartContainerRef}
        style={{ height: "500px" }}
      />
    </div>
  );
};
