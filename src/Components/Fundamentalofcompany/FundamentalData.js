import React, { useState, useEffect } from "react";
import Eps from "./Eps";
import "./FundamentalData.css";
import Revenue from "./Revenue";
function FundamentalData({ stocksymbol }) {
  const [overviewData, setoverviewData] = useState(gtData);
  function gtData() {
    let List = localStorage.getItem("overviewData");
    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }

  return (
    <div className="FundamentalData">
      <div className="FundamentalData-header">
        <p className="company-name">
          {overviewData.Name} ({overviewData.Symbol})
        </p>
        <p className="company-sector">Sector : {overviewData.Industry}</p>
      </div>
      <div className="FundamentalData-overview">
        <p className="company-over-head">Company Overview</p>
        <p className="abt-company">
          <span className="abt-span">ABOUT THE COMPANY - </span> <br></br>
          {overviewData.Description}
        </p>
        <p className="company-address">
          <span className="abts-span">ADDRESS - </span>
          {overviewData.Address}
        </p>
        <div className="fundamentalratios">
          <div className="fundamentalratios1">
            <div className="fundamentalratos">
              <p className="funda-title">LatestQuarter</p>
              <p className="funda-value">{overviewData.LatestQuarter}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">FiscalYearEnd</p>
              <p className="funda-value">{overviewData.FiscalYearEnd}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">MarketCap</p>
              <p className="funda-value">
                {(overviewData.MarketCapitalization / 1000000000000).toFixed(2)}{" "}
                T
              </p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">EBITDA</p>
              <p className="funda-value">{overviewData.EBITDA}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">DividendYield</p>
              <p className="funda-value">{overviewData.DividendYield}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">EPS</p>
              <p className="funda-value">{overviewData.EPS}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">RevenuePerShareTTM</p>
              <p className="funda-value">{overviewData.RevenuePerShareTTM}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">ProfitMargin</p>
              <p className="funda-value">{overviewData.ProfitMargin}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">OperatingMarginTTM</p>
              <p className="funda-value">{overviewData.OperatingMarginTTM}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">TrailingPE</p>
              <p className="funda-value">{overviewData.TrailingPE}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">ForwardPE</p>
              <p className="funda-value">{overviewData.ForwardPE}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">PriceToSalesRatioTTM</p>
              <p className="funda-value">{overviewData.PriceToSalesRatioTTM}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">PriceToBookRatio</p>
              <p className="funda-value">{overviewData.PriceToBookRatio}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">EVToRevenue</p>
              <p className="funda-value">{overviewData.EVToRevenue}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">EVToEBITDA</p>
              <p className="funda-value">{overviewData.EVToEBITDA}</p>
            </div>
          </div>
          <div className="fundamentalratios2">
            <div className="fundamentalratos">
              <p className="funda-title">PERatio</p>
              <p className="funda-value">{overviewData.PERatio}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">PEGRatio</p>
              <p className="funda-value">{overviewData.PEGRatio}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">BookValue</p>
              <p className="funda-value">{overviewData.BookValue} </p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">DividendPerShare</p>
              <p className="funda-value">{overviewData.DividendPerShare}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">ReturnOnAssetsTTM</p>
              <p className="funda-value">{overviewData.ReturnOnAssetsTTM}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">ReturnOnEquityTTM</p>
              <p className="funda-value">{overviewData.ReturnOnEquityTTM}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">RevenueTTM</p>
              <p className="funda-value">{overviewData.RevenueTTM}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">GrossProfitTTM</p>
              <p className="funda-value">{overviewData.GrossProfitTTM}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">DilutedEPSTTM</p>
              <p className="funda-value">{overviewData.DilutedEPSTTM}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">QuarterlyEarningsGrowthYOY</p>
              <p className="funda-value">
                {overviewData.QuarterlyEarningsGrowthYOY}
              </p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">52WeekHigh</p>
              <p className="funda-value">{overviewData["52WeekHigh"]}</p>
            </div>
            <div className="fundamentalratos">
              <p className="funda-title">52WeekLow</p>
              <p className="funda-value">{overviewData["52WeekLow"]}</p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">50DayMovingAverage</p>
              <p className="funda-value">
                {overviewData["50DayMovingAverage"]}
              </p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">200DayMovingAverage</p>
              <p className="funda-value">
                {overviewData["200DayMovingAverage"]}
              </p>
            </div>{" "}
            <div className="fundamentalratos">
              <p className="funda-title">SharesOutstanding</p>
              <p className="funda-value">{overviewData.SharesOutstanding}</p>
            </div>
          </div>
        </div>
      </div>
      <Eps stocksymbol={stocksymbol} />
      <Revenue />
    </div>
  );
}

export default FundamentalData;
