import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import Login from "@/components/Login";
import FlightTime from "@/components/FlightTime";
import Coordinates from "@/components/Coordinates";
import MineCoordinates from "@/components/MineCoordinates";
import MineDetection from "@/components/MineDetection";

import camo from "../assets/camo.png";

interface BufferCoordinates {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bufferCoordinates, setBufferCoordinates] = useState<BufferCoordinates | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const fetchBufferCoordinates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/send-coordinates",
        );

        setBufferCoordinates(response.data.last_coordinates);
      } catch (error) {
        console.error("Error fetching coordinates: ", error);
      }
    };

    const interval = setInterval(fetchBufferCoordinates, 1000);
    fetchBufferCoordinates();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Mine Detection Drone UI</title>
      </Head>

      <div className="overflow-y-hidden w-full bg-repeat-y bg-background flex flex-row">
        <aside className="relative w-[384px] bg-repeat-y">
          <Image
            src={camo}
            className="absolute z-0 inset-0 bg-repeat-y object-cover"
            layout="fill"
            alt=""
          />
          <div className="absolute z-10 inset-0 bg-repeat-y bg-gradient-to-r from-transparent to-background"></div>
        </aside>

        <main className="mx-[256px] justify-center">
          <div>
            {isLoggedIn ? (
              <>
                <div className="flex">
                  <div>
                    <MineDetection />
                    <Coordinates />
                    <FlightTime />
                  </div>
                  <div className="flex">
                    <MineCoordinates addMineCoordinates={() => bufferCoordinates} />
                  </div>
                </div>
              </>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </div>
        </main>

        <aside className="relative w-[384px] bg-repeat-y">
          <Image
            src={camo}
            className="absolute z-0 inset-0 bg-repeat-y object-cover"
            layout="fill"
            alt=""
          />
          <div className="absolute z-10 inset-0 bg-repeat-y bg-gradient-to-l from-transparent to-background"></div>
        </aside>
      </div>
    </>
  );
}
