import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image";
import radar from "../assets/radar.png";

const MineDetection: React.FC = () => {
  const [mine_detection, setMineDetection] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMineDetection = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/send-mine-detection", // URL
        );
        setMineDetection(response.data.mine_detection);
      } catch (error) {
        console.error("Error fetching mine detection: ", error);
      }
    };

    const interval = setInterval(fetchMineDetection, 1000); // 1000 milliseconds = 1 second
    fetchMineDetection();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mr-4 my-8 p-14 shadow-md shadow-rust rounded bg-window">
      <div className="flex justify-center">
        <Image width="64" height="64" alt="" src={radar} />
      </div>
      <div className="flex justify-center items-center text-valid mt-8 px-8  text-2xl font-bold">
        {mine_detection ? (
          <div className="text-invalid">
            <p>Mine Found!</p>
          </div>
        ) : (
          <div className="text-valid">
            <p>Scanning...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MineDetection;
