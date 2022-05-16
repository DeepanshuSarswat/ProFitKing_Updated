import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import FEDERALFUNDSRATE from "./FEDERALFUNDSRATE";
function TREASURYYIELD() {
  function gtData() {
    let List = localStorage.getItem("treasurytield");
    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }
  const [outputvalue, setoutputvalue] = useState(gtData());
  let Datavalue = [];
  let Datadate = [];
  outputvalue?.data?.slice(0, 10).forEach((e) => {
    Datavalue.push(e.value);
    Datadate.push(e.date);
  });
  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=10year&apikey=2KWEIOOBNB82EHKZ"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("treasurytield", JSON.stringify(data))
      );
  }, []);

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      fill: {
        colors: ["#475569"],
      },
      xaxis: {
        labels: {
          format: "yyyy/MM/dd",
        },
        categories: Datadate.reverse(),
      },
    },
    series: [
      {
        name: "TREASURY_YIELD",
        data: Datavalue.reverse(),
      },
    ],
  };

  return (
    <div>
      <div className="realgdp">
        <div className="Realgdptext">
          <p className="real-gdp-header">Treasury Yield</p>
          <p className="real-gdp-p">
            Treasury yield is the return on investment, expressed as a
            percentage, on the U.S. government's debt obligations. Looked at
            another way, the Treasury yield is the effective interest rate that
            the U.S. government pays to borrow money for different lengths of
            time.
          </p>
          <p className="real-gdp-p">
            Treasury yields don't just influence how much the government pays to
            borrow and how much investors earn by buying government bonds. They
            also influence the interest rates that individuals and businesses
            pay to borrow money to buy real estate, vehicles, and equipment.
            Treasury yields also tell us how investors feel about the economy.
            The higher the yields on long-term U.S. Treasuries, the more
            confidence investors have in the economic outlook. But high
            long-term yields can also be a signal of rising inflation in the
            future.
          </p>

          <p className="relatedchart">Name - {outputvalue.name}</p>
          <p className="relatedchart"> Interval - {outputvalue.interval}</p>
          <p className="relatedchart">Unit - {outputvalue.unit}</p>
        </div>
        <Chart
          className="charts-gdp"
          options={state.options}
          series={state.series}
          type="bar"
          width="1050"
          height="300"
        />
        Treasury yield
      </div>
      <FEDERALFUNDSRATE />
    </div>
  );
}

export default TREASURYYIELD;
