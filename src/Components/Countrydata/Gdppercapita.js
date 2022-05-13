import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import TREASURYYIELD from "./TREASURYYIELD";
function Gdppercapita() {
  function gtData() {
    let List = localStorage.getItem("gdppercapita");
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
      "https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&apikey=demo"
    )
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("gdppercapita", JSON.stringify(data))
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
        name: "REAL_GDP_PER_CAPITA",
        data: Datavalue.reverse(),
      },
    ],
  };

  console.log(outputvalue);
  console.log(Datavalue);
  console.log(Datadate);
  return (
    <div>
      <div className="realgdp">
        <div className="Realgdptext">
          <p className="real-gdp-header">Real GDP Per Capita</p>
          <p className="real-gdp-p">
            Per capita gross domestic product (GDP) is a financial metric that
            breaks down a country's economic output per person and is calculated
            by dividing the GDP of a nation by its population.
          </p>
          <p className="real-gdp-p">
            Per capita gross domestic product (GDP) measures a country's
            economic output per person and is calculated by dividing the GDP of
            a country by its population.
          </p>
          <p className="real-gdp-p">
            Small, rich countries and more developed industrial countries tend
            to have the highest per capita GDP.
          </p>
          <p className="real-gdp-p">
            There are a few ways to analyze a country’s wealth and prosperity.
            Per capita GDP is the most universal because its components are
            regularly tracked on a global scale, providing for ease of
            calculation and usage. Income per capita is another measure for
            global prosperity analysis, though it is less broadly used.
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
        Gdp per capita
      </div>
      <TREASURYYIELD />
    </div>
  );
}

export default Gdppercapita;
