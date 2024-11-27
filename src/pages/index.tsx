"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "@/components/Navbar/navbar";
import { PumpEmperor } from "@/components/Dashboard/PumpEmperor";
import  { TokenSearch } from "@/components/Dashboard/TokenSection/tokenSearch";
import { TokenGrid } from "@/components/Dashboard/TokenSection/tokenGrid";
import { ToekenPagination } from "@/components/Dashboard/TokenSection/tokenPagination";
import { TokenCreate } from "@/components/Dashboard/TokenSection/tokenCreate";
import { TokenFilter } from "@/components/Dashboard/TokenSection/tokenFilter";

const Dashboard: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Taraxafun</title>
        <meta content="" name="Taraxafun" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Knewave&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <div className="relative min-h-screen">
          <Navbar />
          <PumpEmperor />
          <TokenSearch />
          <TokenCreate />
          <TokenFilter />
          <TokenGrid />
          <ToekenPagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
