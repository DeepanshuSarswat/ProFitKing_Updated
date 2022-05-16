import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import Unemployement from "./Unemployement";
function ReatilSales() {
  function gtData() {
    let List = localStorage.getItem("retailsales");
    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }
  const [outputvalue, setoutputvalue] = useState(gtData());
  let Datavalue = [];
  let Datadate = [];
  outputvalue?.data?.slice(0, 60).forEach((e) => {
    Datavalue.push(e.value);
    Datadate.push(e.date);
  });
  useEffect(() => {
    fetch("https://www.alphavantage.co/query?function=RETAIL_SALES&apikey=demo")
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("retailsales", JSON.stringify(data))
      );
  }, []);
  const Series = [
    {
      name: "Reatil Sales",
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

  return (
    <div>
      <div className="realgdp">
        <div className="Realgdptext">
          <p className="real-gdp-header">Retail Sales</p>
          <p className="real-gdp-p">
            The term retail sales refers to an economic metric that tracks
            consumer demand for finished goods. This figure is a very important
            data set as it is a key monthly market-moving event. Retail sales
            are reported each month by the U.S. Census Bureau and indicate the
            direction of the economy. It acts as a key economic barometer and
            whether inflationary pressures exist. Retail sales are measured by
            durable and non-durable goods purchased over a defined period of
            time. Sales for the report are derived from 13 types of retailers
            from foodservice to retail stores.
          </p>

          <p className="relatedchart">Name - {outputvalue.name}</p>
          <p className="relatedchart"> Interval - {outputvalue.interval}</p>
          <p className="relatedchart">Unit - {outputvalue.unit}</p>
        </div>
        <Chart
          type="line"
          series={Series}
          options={Option}
          width="1050"
          height="300"
          className="charts-gdp"
        />
        ReatilSales
      </div>

      <Unemployement />
    </div>
  );
}

export default ReatilSales;
