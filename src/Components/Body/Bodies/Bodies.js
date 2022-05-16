import React from "react";
import LeftBody from "../LeftBody/LeftBody";
import RightBody from "../Rightbody/RightBody";
import "./Bodies.css";
<<<<<<< HEAD
function Bodies() {
  return (
    <div className="Bodies">
      <LeftBody />
      <RightBody />
=======
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
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
    </div>
  );
}

export default Bodies;
