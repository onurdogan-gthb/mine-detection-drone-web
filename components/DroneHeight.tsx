import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import drone_height from "../assets/drone_height.png";

const DroneHeight: React.FC = () => {
  const [droneHeight, setDroneHeight] = useState<number | null>(null);

  useEffect(() => {
    const fetchDroneHeight = async () => {
      try {
        const response = await axios.get("http://localhost:5000/send-drone-height");
        console.log("Response data:", response.data); // Add this line for debugging

        setDroneHeight(response.data.distance);
      } catch (error) {
        console.error("Error fetching drone height: ", error);
      }
    };

    const interval = setInterval(fetchDroneHeight, 1000); // Fetch every second
    fetchDroneHeight();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-8 ml-8 px-28 py-10 shadow-md shadow-rust rounded bg-window">
      <div className="mt-4 mb-2 justify-center">
        <Image width="64" height="64" alt="" src={drone_height} />
        {droneHeight !== null ? (
          <p className="ml-1 mt-4 mr-4 font-semibold">{droneHeight}cm</p>
        ) : (
          <p className="mt-4 mr-4 font-semibold">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DroneHeight;
