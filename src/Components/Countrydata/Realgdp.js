import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import Gdppercapita from "./Gdppercapita";
import "./Realgdp.css";
function Realgdp() {
  function gtData() {
    let List = localStorage.getItem("realgdp");
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
      "https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=demo"
    )
      .then((response) => response.json())
      .then((data) => localStorage.setItem("realgdp", JSON.stringify(data)));
  }, []);

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      fill: {
        colors: ["#3f3f46"],
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
        name: "REAL_GDP ",
        data: Datavalue.reverse(),
      },
    ],
  };

  return (
    <div>
      <div className="realgdp">
        <div className="Realgdptext">
          <p className="real-gdp-header">Real GDP</p>
          <p className="real-gdp-p">
            Real gross domestic product (real GDP) is an inflation-adjusted
            measure that reflects the value of all goods and services produced
            by an economy in a given year (expressed in base-year prices) and is
            often referred to as constant-price GDP, inflation-corrected GDP, or
            constant dollar GDP.
          </p>
          <p className="real-gdp-p">
            Real GDP makes comparing GDP from year to year and from different
            years more meaningful because it shows comparisons for both the
            quantity and value of goods and services.
          </p>
          <p className="real-gdp-p">
            Real GDP is a macroeconomic statistic that measures the value of the
            goods and services produced by an economy in a specific period,
            adjusted for inflation. Essentially, it measures a country's total
            economic output, adjusted for price changes.
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
      </div>
      <Gdppercapita />
    </div>
  );
}

export default Realgdp;
