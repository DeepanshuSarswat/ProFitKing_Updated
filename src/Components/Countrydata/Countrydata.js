import React from "react";
import Realgdp from "./Realgdp";
import "./Countrydata.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { useState } from "react";
function Countrydata() {
  let [arrow, setarrow] = useState("none");
  let GotoTop = () => {
    document.documentElement.scrollTop = 0;
  };

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setarrow("block");
    } else {
      setarrow("none");
    }
  }
  return (
    <div className="Countrydata">
      <div className="country-header">America's Economy Data</div>
      <div className="country-body">
        <Realgdp />
      </div>
      <div className="Gototop">
        <button
          onClick={GotoTop}
          className="Gotobtn"
          style={{ display: arrow }}
        >
          <ArrowUpwardIcon />
        </button>
      </div>
    </div>
  );
}

export default Countrydata;
