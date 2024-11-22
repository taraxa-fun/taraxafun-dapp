"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Manrope:wght@200..800&display=swap" />
      </Head>
      <main>
        <h1 className="text-center">Taraxa</h1>
      </main>
    </>
  );
};

export default Home;
