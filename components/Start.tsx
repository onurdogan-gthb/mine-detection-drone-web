import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image";
import stopwatch from "../assets/stopwatch.png";

const Start: React.FC = () => {
  const [start, setStart] = useState<boolean | null>(null);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const fetchStart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/send-start", // URL
        );
        setStart(response.data.start);
      } catch (error) {
        console.error("Error fetching start: ", error);
      }
    };

    const interval = setInterval(fetchStart, 1000); // 1000 milliseconds = 1 second
    fetchStart();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (start) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [start]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mr-4 my-8 p-4 shadow-md shadow-rust rounded bg-window">
      <div className="flex justify-center items-center  px-8 py-3 text-2xl font-bold">
        <p className="">Flight Time</p>
      </div>
      <div className="flex justify-center">
        <Image width="64" height="64" alt="" src={stopwatch} />
      </div>
      <div className="flex justify-center items-center  px-8 py-3  font-semibold">
        {start ? (
          <p>Flight Time: {formatTime(time)}</p>
        ) : (
          <p>Waiting for start...</p>
        )}
      </div>
    </div>
  );
};

export default Start;
