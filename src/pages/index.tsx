"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Navbar } from "@/components/Navbar/navbar";
import { PumpEmperor } from "@/components/Dashboard/PumpEmperor";
import { TokenSearch } from "@/components/Dashboard/TokenSection/tokenSearch";
import { TokenGrid } from "@/components/Dashboard/TokenSection/tokenGrid";
import { TokenPagination } from "@/components/Dashboard/TokenSection/tokenPagination";
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
    <div className="relative min-h-screen">
      <Navbar />
      <PumpEmperor />
      <TokenSearch />
      <TokenCreate />
      <TokenFilter />
      <TokenGrid />
      <TokenPagination />
    </div>
  );
};

export default Dashboard;
