import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
function Unemployement() {
  function gtData() {
    let List = localStorage.getItem("UNEMPLOYMENT");
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
    fetch("https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=demo")
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("UNEMPLOYMENT", JSON.stringify(data))
      );
  }, []);
  const Series = [
    {
      name: "Unemployement",
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
          <p className="real-gdp-header">Unemployment Rate</p>
          <p className="real-gdp-p">
            The unemployment rate is the percentage of the labor force without a
            job. It is a lagging indicator, meaning that it generally rises or
            falls in the wake of changing economic conditions, rather than
            anticipating them. When the economy is in poor shape and jobs are
            scarce, the unemployment rate can be expected to rise. When the
            economy is growing at a healthy rate and jobs are relatively
            plentiful, it can be expected to fall.
          </p>

          <p className="relatedchart">Name - {outputvalue.name}</p>
          <p className="relatedchart"> Interval - {outputvalue.interval}</p>
          <p className="relatedchart">Unit - {outputvalue.unit}</p>
        </div>{" "}
        <Chart
          className="charts-gdp"
          type="line"
          series={Series}
          options={Option}
          width="1050"
          height="300"
        />
        Unemployement
      </div>
    </div>
  );
}

export default Unemployement;
