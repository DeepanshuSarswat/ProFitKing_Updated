import React from "react";
import Balancetable from "./Balancetable";

function Balancesheet() {
  return (
    <div>
      <div className="realgdps Eps">
        <p className="Eps-header">DETAILED ANNUAL BALANCE SHEET</p>
        <Balancetable />
      </div>
    </div>
  );
}

export default Balancesheet;
