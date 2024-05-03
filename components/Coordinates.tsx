import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import location from "../assets/location.png";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const Coordinates: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

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
    <div>
      <div className="mr-4 my-8 p-10 shadow-md shadow-rust rounded bg-window">
        <div className="flex justify-center">
          <Image width="64" height="64" alt="" src={location} />
        </div>

        <div className="flex justify-center items-center mt-4 px-8 py-3 text-2xl font-bold">
          <p className="text-chrome">Current</p>&nbsp;<p>Location</p>
        </div>

        {coordinates ? (
          <div className="mx-8">
            <div className="flex">
              <p className="font-semibold">Latitude</p>
              <div className="ml-auto">
                <p>{coordinates.latitude}</p>
              </div>
            </div>

            <div className="flex">
              <p className="font-semibold">Longitude</p>
              <div className="ml-auto">
                <p>{coordinates.longitude}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="flex my-8 justify-center items-center text-xl font-semibold">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default Coordinates;
