import React from "react";
import { useState } from "react";
function Balancetable() {
  const [outputvalue, setoutputvalue] = useState(gtData());
  function gtData() {
    let List = localStorage.getItem("Balancesheet");

    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }
  return (
    <div>
      <table class="content-table" width="100%">
        <thead>
          <tr>
            <th>Points</th>
            {outputvalue?.annualReports?.map((e) => {
              return <th>{e.fiscalDateEnding}</th>;
            })}
          </tr>
        </thead>
        <tbody className="ponts">
          <tr>
            <th>Total Assets</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.totalAssets}</td>;
            })}
          </tr>
          <tr>
            <th>Total Current Assets</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.totalCurrentAssets}</td>;
            })}
          </tr>
          <tr>
            <th>Cash And Cash Equivalents At Carrying Value</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.cashAndCashEquivalentsAtCarryingValue}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Cash And Short Term Investments</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.cashAndShortTermInvestments}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Inventory</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.inventory}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Net Receivables</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.currentNetReceivables}</td>;
            })}
          </tr>
          <tr>
            <th>Total Non Current Assets</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.totalNonCurrentAssets}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Property Plant Equipment</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.propertyPlantEquipment}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Investments</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.investments}</td>;
            })}
          </tr>
          <tr>
            <th>Long Term Investments</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.longTermInvestments}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Short Term Investments</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.shortTermInvestments}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Other Current Assets</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.otherCurrentAssets}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Other Non Currrent Assets</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.otherNonCurrrentAssets}</td>;
            })}
          </tr>
          <tr>
            <th>Total Liabilities</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.totalLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Accounts Payable</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.currentAccountsPayable}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Debt</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.currentDebt}</td>;
            })}
          </tr>
          <tr>
            <th>Short Term Debt</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.shortTermDebt}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Total Non Current Liabilities</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.totalNonCurrentLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Long Term Debt</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.longTermDebt}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Long Term Debt</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.currentLongTermDebt}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Long Term Debt Non Current</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.longTermDebtNoncurrent}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Short Long Term Debt Total</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.shortLongTermDebtTotal}</td>;
            })}
          </tr>
          <tr>
            <th>Other Current Liabilities</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.otherCurrentLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Other Non Current Liabilities</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.otherNonCurrentLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Total Shareholder Equity</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.totalShareholderEquity}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Treasury Stock</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.treasuryStock}</td>;
            })}
          </tr>
          <tr>
            <th>Retained Earnings</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.retainedEarnings}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Common Stock</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.commonStock}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Common Stock Shares Out Standing</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.commonStockSharesOutstanding}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <p className="Eps-header"> DETAILED QUARTERLY BALANCE SHEET</p>
      <table class="content-table" width="100%">
        <thead>
          <tr>
            <th>Points</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <th>{e.fiscalDateEnding}</th>;
            })}
          </tr>
        </thead>
        <tbody className="ponts">
          <tr>
            <th>Total Assets</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.totalAssets}</td>;
            })}
          </tr>
          <tr>
            <th>Total Current Assets</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.totalCurrentAssets}</td>;
            })}
          </tr>
          <tr>
            <th>Cash And Cash Equivalents At Carrying Value</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.cashAndCashEquivalentsAtCarryingValue}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Cash And Short Term Investments</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.cashAndShortTermInvestments}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Inventory</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.inventory}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Net Receivables</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.currentNetReceivables}</td>;
            })}
          </tr>
          <tr>
            <th>Total Non Current Assets</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.totalNonCurrentAssets}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Property Plant Equipment</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.propertyPlantEquipment}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Investments</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.investments}</td>;
            })}
          </tr>
          <tr>
            <th>Long Term Investments</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.longTermInvestments}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Short Term Investments</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.shortTermInvestments}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Other Current Assets</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.otherCurrentAssets}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Other Non Currrent Assets</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.otherNonCurrrentAssets}</td>;
            })}
          </tr>
          <tr>
            <th>Total Liabilities</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.totalLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Accounts Payable</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.currentAccountsPayable}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Debt</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.currentDebt}</td>;
            })}
          </tr>
          <tr>
            <th>Short Term Debt</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.shortTermDebt}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Total Non Current Liabilities</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.totalNonCurrentLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Long Term Debt</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.longTermDebt}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Current Long Term Debt</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.currentLongTermDebt}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Long Term Debt Non Current</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.longTermDebtNoncurrent}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Short Long Term Debt Total</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.shortLongTermDebtTotal}</td>;
            })}
          </tr>
          <tr>
            <th>Other Current Liabilities</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.otherCurrentLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Other Non Current Liabilities</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.otherNonCurrentLiabilities}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Total Shareholder Equity</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.totalShareholderEquity}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Treasury Stock</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.treasuryStock}</td>;
            })}
          </tr>
          <tr>
            <th>Retained Earnings</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.retainedEarnings}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Common Stock</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.commonStock}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Common Stock Shares Out Standing</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.commonStockSharesOutstanding}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Balancetable;
