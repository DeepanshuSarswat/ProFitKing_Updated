import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import Inflation from "./Inflation";
function Cpi() {
  function gtData() {
    let List = localStorage.getItem("cpi");
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
      "https://www.alphavantage.co/query?function=CPI&interval=semiannual&apikey=2KWEIOOBNB82EHKZ"
    )
      .then((response) => response.json())
      .then((data) => localStorage.setItem("cpi", JSON.stringify(data)));
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
        name: "consumer price index ",
        data: Datavalue.reverse(),
      },
    ],
  };
  return (
    <div>
      <div className="realgdp">
        <div className="Realgdptext">
          <p className="real-gdp-header">Consumer Price Index </p>
          <p className="real-gdp-p">
            The Consumer Price Index (CPI) is a measure that examines the
            weighted average of prices of a basket of consumer goods and
            services, such as transportation, food, and medical care. It is
            calculated by taking price changes for each item in the
            predetermined basket of goods and averaging them. Changes in the CPI
            are used to assess price changes associated with the cost of living.
          </p>
          <p className="real-gdp-p">
            The CPI statistics cover a variety of individuals with different
            incomes, including retirees, but does not include certain
            populations, such as patients of mental hospitals.
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
          width="1250"
          height="300"
        />
        CPI
      </div>
      <Inflation />
    </div>
  );
}

export default Cpi;
