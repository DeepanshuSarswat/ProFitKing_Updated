import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Bodies from "./Components/Body/Bodies/Bodies";
function App() {
  return (
    <div className="App">
      <Header />
      <Bodies />
    </div>
  );
  // let arrr = [];
  // const [chartData, setchartData] = useState([]);
  // const [symbolvalue, setsymbolvalue] = useState("");
  // const [symbol, setsymbol] = useState("");
  // const [symbolData, setsymbolData] = useState([]);
  // let symboltoname = {};
  // let states = {
  //   series: [
  //     {
  //       data: arrr,
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: "candlestick",
  //       height: 350,
  //     },
  //     title: {
  //       text: "CandleStick Chart",
  //       align: "left",
  //     },
  //     xaxis: {
  //       type: "datetime",
  //     },
  //     yaxis: {
  //       tooltip: {
  //         enabled: true,
  //       },
  //     },
  //   },
  // };
  // useEffect(() => {
  //   fetch(
  //     `https://api.twelvedata.com/time_series?apikey=cc142ccd11b0460985ac8e6daff8f278&interval=1day&symbol=${symbolvalue}&outputsize=400`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setchartData(data));
  // }, [symbolvalue]);
  // let newData = chartData.values;
  // function candelData() {
  //   for (let i = 0; i < newData?.length; i++) {
  //     const e = newData[i];
  //     let finalData = [e.open, e.high, e.low, e.close];
  //     let objjData = {
  //       x: new Date(e.datetime),
  //       y: finalData,
  //     };
  //     arrr.push(objjData);
  //   }
  // }
  // candelData();
  // const submitData = (e) => {
  //   e.preventDefault();
  //   setsymbolvalue(symbol);
  // };
  // let finalData = symbolData?.data;
  // let finalDatas = finalData?.filter((e) => {
  //   return e.country == "United States";
  // });
  // finalDatas?.forEach((e) => {
  //   let eedaa = e.name.replace(/[, ]+/g, "", " ").trim();
  //   symboltoname[eedaa] = e?.symbol;
  // });
  // return (
  //   <div className="App">
  //     <form onSubmit={submitData}>
  //       <input
  //         type="text"
  //         placeholder="Enter stocks name"
  //         value={symbol}
  //         onChange={(e) => setsymbol(e.target.value)}
  //       />
  //     </form>
  //     <div className="row">
  //       {symbolvalue && (
  //         <div className="mixed-chart">
  //           {chartData?.meta?.symbol}
  //           <Chart
  //             options={states.options}
  //             series={states.series}
  //             type="candlestick"
  //             height={500}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default App;
