import React, { useState } from "react";
import Head from "next/head";

import Login from "@/components/Login";
import Coordinates from "@/components/Coordinates";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Head>
        <title>Mine Detection Drone UI</title>
      </Head>

      <div className="w-full flex flex-row bg-background">
        <aside></aside>

        <main>
          <div className="w-screen flex justify-center">
            {isLoggedIn ? <Coordinates /> : <Login onLogin={handleLogin} />}
          </div>
        </main>

        <aside></aside>
      </div>
    </>
  );
}
