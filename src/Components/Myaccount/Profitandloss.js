import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useLayoutEffect } from "react";
import "./Profitandloss.css";
function Profitandloss() {
const [profitlossData,setprofitlossData] = useState([]);
  async function get_pandf(){
    let response = await fetch('/getpandf')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'success'){

        setprofitlossData(json['data'])}
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }
useLayoutEffect(()=>{
get_pandf()
},[])

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
              {/* <td>TATA MOTORS EQ</td>
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
              </td> */}
            </tr>
            {
              profitlossData?.map((e)=>{
          
               
                let buy_time = e.buy_date?.split('T')[1].split('.')[0]+' '+'('+e.buy_date.split('T')[0]+')';
              let sell_date = e.sell_date?.split('T')[1].split('.')[0]+' '+'('+e.sell_date.split('T')[0]+')';
                return(
                  <tr>
                    <td>{e.symbol}</td>
                    <td>{buy_time}</td>
                    <td>{e.quantity}</td>
                    <td>{e.price/e.quantity}</td>
                    <td>{sell_date}</td>
                    <td>{e.sell_quantity}</td>
                    <td>{e.sell_price}</td>
                    <td className={((parseFloat(e.sell_price)) - (parseFloat(e.price)/parseInt(e.quantity)))>0?"green":"red"}>₹ {((parseFloat(e.sell_price)) - (parseFloat(e.price)/parseInt(e.quantity)))}
                    <br></br>
                    {(((parseFloat(e.sell_price)-parseFloat((e.price)/(e.quantity)))/(parseFloat(e.price/e.quantity))))*(100)} %
                     </td>
                   

                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profitandloss;
