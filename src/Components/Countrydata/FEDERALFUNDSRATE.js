import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import Cpi from "./Cpi";

function FEDERALFUNDSRATE() {
  function gtData() {
    let List = localStorage.getItem("FEDERALFUNDSRATE");
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
      "https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=demo"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("FEDERALFUNDSRATE", JSON.stringify(data))
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
        name: "Federal funds rate (interest rate)",
        data: Datavalue.reverse(),
      },
    ],
  };
  return (
    <div>
      <div className="realgdp">
        <div className="Realgdptext">
          <p className="real-gdp-header">FEDERAL FUNDS RATE</p>
          <p className="real-gdp-p">
            The term federal funds rate refers to the target interest rate set
            by the Federal Open Market Committee (FOMC). This target is the rate
            at which the fed suggests commercial banks borrow and lend their
            excess reserves to each other overnight.
          </p>
          <p className="real-gdp-p">
            The federal funds rate is the target interest rate set by the FOMC.
          </p>
          <p className="real-gdp-p">
            This is the rate at which commercial banks borrow and lend their
            excess reserves to each other overnight.
          </p>
          <p className="real-gdp-p">
            The FOMC sets a target federal funds rate eight times a year, based
            on prevailing economic conditions.
          </p>
          <p className="real-gdp-p">
            The federal funds rate can influence short-term rates on consumer
            loans and credit cards.
          </p>
          <p className="real-gdp-p">
            Investors keep an eye out on the federal funds rate as well because
            it has an impact on the stock market.
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
        FEDERAL FUNDS RATE
      </div>
      <Cpi />
    </div>
  );
}

export default FEDERALFUNDSRATE;
