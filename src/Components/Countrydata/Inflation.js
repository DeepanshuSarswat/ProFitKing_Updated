import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

function Inflation() {
  function gtData() {
    let List = localStorage.getItem("inflation");
    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }
  const [outputvalue, setoutputvalue] = useState(gtData());
  let Datavalue = [];
  let Datadate = [];
  outputvalue?.data?.forEach((e) => {
    Datavalue.push(e.value);
    Datadate.push(e.date);
  });
  useEffect(() => {
    fetch("https://www.alphavantage.co/query?function=INFLATION&apikey=demo")
      .then((response) => response.json())
      .then((data) => localStorage.setItem("inflation", JSON.stringify(data)));
  }, []);
  const Series = [
    {
      name: "Inflation",
      data: Datavalue.reverse(),
    },
  ];
  const Option = {
    chart: {
      id: "guest",
      group: "social",
    },
    xaxis: {
      categories: Datadate.reverse(),
    },
    colors: ["#475569"],
    stroke: {
      curve: "smooth",
    },
  };
console.log(outputvalue)
  return (
    <div>
      <div className="realgdp">
        <div className="Realgdptext">
          <p className="real-gdp-header">Inflation</p>
          <p className="real-gdp-p">
            Inflation is the decline of purchasing power of a given currency
            over time. A quantitative estimate of the rate at which the decline
            in purchasing power occurs can be reflected in the increase of an
            average price level of a basket of selected goods and services in an
            economy over some period of time. The rise in the general level of
            prices, often expressed as a percentage, means that a unit of
            currency effectively buys less than it did in prior periods.
          </p>
          <p className="real-gdp-p">
            Inflation is the rate at which the value of a currency is falling
            and, consequently, the general level of prices for goods and
            services is rising
          </p>

          <p className="relatedchart">Name - {outputvalue.name}</p>
          <p className="relatedchart"> Interval - {outputvalue.interval}</p>
          <p className="relatedchart">Unit - {outputvalue.unit}</p>
        </div>
        <Chart
          type="line"
          series={Series}
          options={Option}
          width="1250"
          height="300"
          className="charts-gdp"
        />
        Inflation
      </div>
      
    </div>
  );
}

export default Inflation;
