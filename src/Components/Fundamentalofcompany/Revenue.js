import * as React from "react";
import Chart from "react-apexcharts";
import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import "./Revenue.css";
import Detailedincome from "./Detailedincome";
function Revenue() {
  function gtData() {
    let List = localStorage.getItem("totalRevenue");
    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }
  const [outputvalue, setoutputvalue] = useState(gtData());
  const [qtoa, setqtoa] = useState("QUARTERLY");
  const [annually, setannually] = useState(true);
  let Datavalue = [];
  let Datadate = [];
  let Datavalueqr = [];
  let Datadateqr = [];
  let Dataprofit = [];
  let dataprofitqr = [];
  let keys = [];
  outputvalue?.quarterlyReports?.slice(0, 5).forEach((e) => {
    Datavalueqr.push(e.totalRevenue);
    Datadateqr.push(e.fiscalDateEnding);
    dataprofitqr.push(e.grossProfit);
  });
  outputvalue?.quarterlyReports?.slice(0, 1).forEach((e) => {
    keys.push(Object.keys(e));
  });
  outputvalue?.annualReports?.slice(0, 5).forEach((e) => {
    Datavalue.push(e.totalRevenue);
    Datadate.push(e.fiscalDateEnding);
    Dataprofit.push(e.grossProfit);
  });
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
        categories: annually ? Datadate.reverse() : Datadateqr.reverse(),
      },
    },
    series: [
      {
        name: "Total Revenue ",
        data: annually ? Datavalue.reverse() : Datavalueqr.reverse(),
        //  Datavalue.reverse(),
      },
    ],
  };

  const states = {
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
        categories: annually ? Datadate : Datadateqr,
      },
    },
    series: [
      {
        name: "Gross Profit ",
        data: annually ? Dataprofit.reverse() : dataprofitqr.reverse(),
        //  Datavalue.reverse(),
      },
    ],
  };

  const habelqtoa = () => {
    if (qtoa == "QUARTERLY") {
      setqtoa("ANNUALLY");
      setannually(false);
    } else {
      setqtoa("QUARTERLY");
      setannually(true);
    }
  };
  return (
    <div>
      <div className="realgdps Eps">
        <p className="Eps-header">ANNUAL REPORTS</p>
        <p className="eps-share">
          <p>Total Revenue and Gross Profit </p>
          <p>
            <Button variant="contained" size="medium" onClick={habelqtoa}>
              {qtoa}
            </Button>
          </p>
        </p>
        <div className="chartgroup">
          <Chart
            className="chartsgdp"
            options={state.options}
            series={state.series}
            type="bar"
            width="900"
            height="300"
          />

          <Chart
            className="chartsgdp"
            options={states.options}
            series={states.series}
            type="bar"
            width="900"
            height="300"
          />
        </div>
      </div>
      <Detailedincome outputvalue={outputvalue} keys={keys} />
    </div>
  );
}

export default Revenue;
