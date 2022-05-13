import * as React from "react";
import "./Eps.css";
import Chart from "react-apexcharts";
import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
function Eps({ stocksymbol }) {
  function gtData() {
    let List = localStorage.getItem("eps");
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
  outputvalue?.quarterlyEarnings?.slice(0, 10).forEach((e) => {
    Datavalueqr.push(e.reportedEPS);
    Datadateqr.push(e.fiscalDateEnding);
  });

  outputvalue?.annualEarnings?.slice(0, 10).forEach((e) => {
    Datavalue.push(e.reportedEPS);
    Datadate.push(e.fiscalDateEnding);
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
        name: "EPS ",
        data: annually ? Datavalue.reverse() : Datavalueqr.reverse(),
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
  console.log(outputvalue);
  return (
    <div>
      <div className="realgdps Eps">
        <p className="Eps-header">Earnings</p>
        <p className="eps-share">
          <p>Earnings per share(EPS) </p>
          <p>
            <Button variant="contained" size="medium" onClick={habelqtoa}>
              {qtoa}
            </Button>
          </p>
        </p>

        <Chart
          className="chartsgdp"
          options={state.options}
          series={state.series}
          type="bar"
          width="1200"
          height="300"
        />
      </div>
    </div>
  );
}

export default Eps;
