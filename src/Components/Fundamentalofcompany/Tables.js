import React from "react";

function Tables({ outputvalue }) {
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
            <th>Total Revenue</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.totalRevenue}</td>;
            })}
          </tr>
          <tr>
            <th>Gross Profit</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.grossProfit}</td>;
            })}
          </tr>
          <tr>
            <th>Cost Of Revenue</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.costOfRevenue}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Cost of Goods And Services Sold</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.costofGoodsAndServicesSold}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Operating Income</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.operatingIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Selling General AndAdministrative</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.sellingGeneralAndAdministrative}</td>;
            })}
          </tr>
          <tr>
            <th>Research And Development</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.researchAndDevelopment}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Operating Expenses</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.operatingExpenses}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Net Interest Income</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.netInterestIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Interest Income</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.interestIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Interest Expense</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.interestExpense}</td>;
            })}
          </tr>
          <tr>
            <th>Other Non Operating Income</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.otherNonOperatingIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Depreciation</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.depreciation}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Income Before Tax</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.incomeBeforeTax}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Income Tax Expense</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.incomeTaxExpense}</td>;
            })}
          </tr>
          <tr>
            <th>Ebit</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.ebit}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>ebitda</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.ebitda}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Net Income</th>
            {outputvalue?.annualReports?.map((e) => {
              return <td>{e.netIncome}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <p className="Eps-header"> DETAILED QUARTERLY REPORTS</p>
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
            <th>Total Revenue</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.totalRevenue}</td>;
            })}
          </tr>
          <tr>
            <th>Gross Profit</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.grossProfit}</td>;
            })}
          </tr>
          <tr>
            <th>Cost Of Revenue</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.costOfRevenue}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Cost of Goods And Services Sold</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.costofGoodsAndServicesSold}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Operating Income</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.operatingIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Selling General AndAdministrative</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.sellingGeneralAndAdministrative}</td>;
            })}
          </tr>
          <tr>
            <th>Research And Development</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.researchAndDevelopment}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Operating Expenses</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.operatingExpenses}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Net Interest Income</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.netInterestIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Interest Income</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.interestIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Interest Expense</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.interestExpense}</td>;
            })}
          </tr>
          <tr>
            <th>Other Non Operating Income</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.otherNonOperatingIncome}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Depreciation</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.depreciation}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Income Before Tax</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.incomeBeforeTax}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Income Tax Expense</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.incomeTaxExpense}</td>;
            })}
          </tr>
          <tr>
            <th>Ebit</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.ebit}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>ebitda</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.ebitda}</td>;
            })}
          </tr>{" "}
          <tr>
            <th>Net Income</th>
            {outputvalue?.quarterlyReports?.slice(0, 5)?.map((e) => {
              return <td>{e.netIncome}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
