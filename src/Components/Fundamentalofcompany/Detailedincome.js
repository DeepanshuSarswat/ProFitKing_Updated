import React from "react";
import Balancesheet from "./Balancesheet";
import Tables from "./Tables";

function Detailedincome({ outputvalue, keys }) {
  return (
    <div>
      <div className="realgdps Eps">
        <p className="Eps-header">DETAILED ANNUAL REPORTS</p>
        <Tables outputvalue={outputvalue} />
      </div>
      <Balancesheet />
    </div>
  );
}

export default Detailedincome;
