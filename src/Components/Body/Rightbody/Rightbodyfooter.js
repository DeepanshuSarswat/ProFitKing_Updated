import React from "react";
import "./Rightbodyfooter.css";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
function Rightbodyfooter({
  openholding,
  setopenholding,
  fullscreen,
  setfullscreen,
}) {
  const handleorder = () => {
    setopenholding(true);
  };
  const handlepositions = () => {
    setopenholding(true);
  };
  const handleholding = () => {
    setopenholding(true);
  };
  const handlecollapse = () => {
    if (openholding == true) {
      setopenholding(false);
    } else {
      setopenholding(true);
    }
    if (fullscreen == true) {
      setopenholding(false);
      setfullscreen(false);
    }
  };
  const handlefullscreen = () => {
    if (fullscreen == false) {
      setfullscreen(true);
    } else {
      setfullscreen(false);
    }
  };

  return (
    <div
      className={`${openholding && "rightbody-btm-ftr"} ${
        fullscreen && "fullScreen"
      }`}
    >
      <div className="Rightbodyfooter">
        <div className="orders" onClick={handleorder}>
          {" "}
          ORDERS
        </div>
        <div className="POSITION" onClick={handlepositions}>
          {" "}
          POSITION
        </div>
        <div className="orders" onClick={handleholding}>
          HOLDING
        </div>
        <div className="open-screen">
          <div className="screencoll1" onClick={handlefullscreen}>
            <CloseFullscreenIcon className="closefullscree" />
          </div>
          <div className="screencoll2" onClick={handlecollapse}>
            <UnfoldLessIcon className="collaspe" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbodyfooter;
