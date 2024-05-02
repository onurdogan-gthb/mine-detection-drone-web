import React, { useState } from "react";

interface MineCoordinates {
  latitude: number;
  longitude: number;
}

const Mines: React.FC<{ addCoordinate: () => MineCoordinates | null }> = ({ addCoordinate }) => {
  const [coordinatesList, setCoordinatesList] = useState<MineCoordinates[]>([]);

  const handleClick = () => {
    let newCoordinate = addCoordinate();
    if (!newCoordinate) {
      newCoordinate = { latitude: 0, longitude: 0 };
    }
    setCoordinatesList((prevList) => [...prevList, newCoordinate]);
  };

  return (
    <div className=" w-[512px] m-8 p-8 rounded bg-window shadow-md shadow-rust">
        <div className="flex justify-center items-center">

        <button
            className="mb-8 px-36 py-3 rounded bg-rust hover:bg-metal font-semibold text-lg text-white"
            type="button"
            onClick={handleClick}
          >
            Add Location
          </button>
        </div>
      <ul>
        {coordinatesList.map((coordinate, index) => (
          <li key={index} className="text-center">
            Latitude: {coordinate.latitude}, Longitude: {coordinate.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mines;
