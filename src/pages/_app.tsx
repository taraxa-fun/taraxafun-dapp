import { WagmiProvider } from "wagmi";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { web3Config } from "@/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { InitAuth } from "@/components/Auth/InitAuth";
import { useWebSocketStore } from "@/store/WS/useWebSocketStore";
import { Navbar } from "@/components/Navbar/navbar";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { initWebSockets, cleanup } = useWebSocketStore();
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    initWebSockets();
    return () => cleanup();
  }, []);
  return (
    <WagmiProvider config={web3Config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Toaster />
          <Navbar />
          {loading && (
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5600AA] to-[#9A62FF] animate-pulse z-50" />
          )}
          <Component {...pageProps} />
          <InitAuth />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
