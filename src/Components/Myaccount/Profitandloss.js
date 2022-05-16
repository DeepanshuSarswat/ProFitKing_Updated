import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Profitandloss.css";
function Profitandloss() {
  const teblelabel = [
    "Scrip",
    "Buy Date",
    "Buy qty.",
    "Buy price & avg.",
    "Sell date	",
    "Sell qty.",
    "Sell price & avg.",
    "Gross P&L & percent",
  ];
  return (
    <div className="Profitandloss">
      <div className="Myaccount-header">
        <div className="Myaccount-header-child">
          <div className="header-logo">
            <p>Profit King</p>
            <p>
              <CurrencyRupeeIcon className="rupee-logo" />
            </p>
          </div>
          <div className="header-profile">Profit and Loss</div>
        </div>
      </div>
      <div className="Pandl-body">
        <table class="content-table" width="100%">
          <thead>
            <tr>
              {teblelabel.map((e) => {
                return <th>{e}</th>;
              })}
            </tr>
          </thead>
          <tbody className="ponts">
            <tr>
              <td>TATA MOTORS EQ</td>
              <td>11/05/2022</td>
              <td>5</td>
              <td>
                {" "}
                ₹1,923.00 <br></br>₹384.60
              </td>
              <td>13/05/2022 </td>
              <td>5</td>
              <td>
                {" "}
                ₹1,970.00 <br></br>₹394.00
              </td>
              <td>
                ₹47.00
                <br></br>(0.02%)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profitandloss;
