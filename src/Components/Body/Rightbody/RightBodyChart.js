import React from "react";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import "./RightBodyChar.css";
function RightBodyChart({
  stocksymbol,
  companyname,
  exchange,
  timeframe,
  chartype,
  chartchange,
  openholding,
<<<<<<< HEAD
=======
  fullscreen,
  zoom,
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
}) {
  let arrr = [];
  let closingprice = [];
  let closeDate = [];
  const [chartData, setchartData] = useState([]);
  const [symbolData, setsymbolData] = useState([]);
  const [fetcherr, setfetcherr] = useState("");
  let symboltoname = {};

  let states = {
    series: [
      {
        data: arrr,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  useEffect(() => {
    fetch(
      `https://api.twelvedata.com/time_series?apikey=cc142ccd11b0460985ac8e6daff8f278&interval=${timeframe}&symbol=${stocksymbol}&outputsize=400`
    )
      .then((response) => response.json())
      .then((data) => setchartData(data))
      .catch((err) => setfetcherr(err.message));
  }, [stocksymbol, timeframe]);
  let newData = chartData.values;
  function candelData() {
    for (let i = 0; i < newData?.length; i++) {
      const e = newData[i];
      let finalData = [e.open, e.high, e.low, e.close];

      let objjData = {
        x: new Date(e.datetime),
        y: finalData,
      };
      closingprice.push(e.close);
      closeDate.push(e.datetime);
      arrr.push(objjData);
    }
  }
  candelData();

  let finalData = symbolData?.data;
  let finalDatas = finalData?.filter((e) => {
    return e.country == "United States";
  });
  finalDatas?.forEach((e) => {
    let eedaa = e.name.replace(/[, ]+/g, "", " ").trim();
    symboltoname[eedaa] = e?.symbol;
  });
  let linestates = {
    series: [
      {
        name: "Stock Price",
        data: closingprice,
      },
    ],
    options: {
      chart: {
        id: "stock",
        group: "market",
      },
      xaxis: {
        categories: closeDate,
      },
      stroke: {
        curve: "smooth",
      },
    },
  };
  console.log(arrr);
  return (
<<<<<<< HEAD
    <div className="rightbodychart">
=======
    <div className={"rightbodychart"}>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
      {fetcherr != "" && <p>{fetcherr}</p>}
      {stocksymbol.length > 0 ? (
        <div className="row">
          {stocksymbol.length > 0 && (
            <div className="mixed-chart">
              <div className="stockinfo">
                <p className="companyname">{companyname}</p>
                <p className="exchange">{exchange}</p>
              </div>
              <Chart
                options={(chartchange ? linestates : states).options}
                series={(chartchange ? linestates : states).series}
                type={chartype}
                className="chartDatass"
<<<<<<< HEAD
                height={openholding ? 160 : 355}
=======
                // height={zoom ? 450 : openholding ? 160 : 355}
                height={zoom ? 450 : 355}

>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
                // from 355
                // 160
              />
            </div>
          )}
        </div>
      ) : (
        <div className="stockimg">
          <img src="/images/stockimg.svg" className="stockimages" />
        </div>
      )}
    </div>
  );
}

export default RightBodyChart;
