import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import icon from "../assets/icon.png";

const Amblem: React.FC = () => {

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

export default Amblem;
