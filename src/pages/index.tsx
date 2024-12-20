"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { PumpEmperor } from "@/components/Dashboard/PumpEmperor";
import { TokenSearch } from "@/components/Dashboard/TokenSection/tokenSearch";
import { TokenGrid } from "@/components/Dashboard/TokenSection/tokenGrid";
import { TokenCreate } from "@/components/Dashboard/TokenSection/tokenCreate";
import { TokenFilter } from "@/components/Dashboard/TokenSection/tokenFilter";
import { TokenPagination } from "@/components/Dashboard/TokenSection/tokenPagination";

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
