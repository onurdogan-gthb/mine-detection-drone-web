import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";

import Login from "@/components/Login";
import Coordinates from "@/components/Coordinates";
import Mines from "@/components/Mines";

import camo from "../assets/camo.jpg";
import Start from "@/components/Start";
import Scan from "@/components/Scan";

interface MineCoordinates {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coordinates, setCoordinates] = useState<MineCoordinates | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/send-coordinates", // URL
        );
        setCoordinates(response.data.last_coordinates);
      } catch (error) {
        console.error("Error fetching coordinates: ", error);
      }
    };

    const interval = setInterval(fetchCoordinates, 1000); // 1000 milliseconds = 1 second
    fetchCoordinates();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Mine Detection Drone UI</title>
      </Head>

      <div className="w-full flex  flex-row bg-background  overflow-y-hidden">
        <aside className="h-screen w-[384px]  relative">
          <Image
            src={camo}
            alt=""
            className="absolute inset-0 z-0 object-cover"
            layout="fill"
          />
          <div className="absolute inset-0  bg-gradient-to-r from-transparent to-background z-10"></div>
        </aside>

        <main className="mx-[256px] justify-center">
          <div>
            {isLoggedIn ? (
              <>
                <div className="flex">
                  <div>
                    <Scan />
                    <Coordinates />
                    <Start />
                  </div>
                  <div className="flex">
                    <Mines addCoordinate={() => coordinates} />
                  </div>
                </div>
              </>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </div>
        </main>

        <aside className="h-screen w-[384px] relative">
          <Image
            src={camo}
            alt=""
            className="absolute inset-0 z-0 object-cover"
            layout="fill"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background z-10"></div>
        </aside>
      </div>
    </>
  );
}
