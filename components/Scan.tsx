import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image";
import radar from "../assets/radar.png";

const Scan: React.FC = () => {
  const [scan, setScan] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchScan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/send-scan", // URL
        );
        setScan(response.data.scan);
      } catch (error) {
        console.error("Error fetching scan: ", error);
      }
    };

    const interval = setInterval(fetchScan, 1000); // 1000 milliseconds = 1 second
    fetchScan();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mr-4 my-8 p-14 shadow-md shadow-rust rounded bg-window">
      <div className="flex justify-center">
        <Image width="64" height="64" alt="" src={radar} />
      </div>
      <div className="flex justify-center items-center text-valid mt-8 px-8  text-2xl font-bold">
        {scan ? (
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

export default Scan;
