import React from "react";
import LeftBody from "../LeftBody/LeftBody";
import RightBody from "../Rightbody/RightBody";
import "./Bodies.css";
import { useState } from "react";
function Bodies() {
  const [zoom, setzoom] = useState(false);
  return (
    <div
      className={zoom ? "BodiesS" : "Bodies"}
      // className="Bodies"
    >
      <LeftBody />
      <RightBody zoom={zoom} setzoom={setzoom} />
    </div>
  );
}

export default Bodies;
