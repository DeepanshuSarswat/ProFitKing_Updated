import * as React from "react";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./Header.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import { useState } from "react";
function Header() {
  const [openfunds, setopenfunds] = useState(false);
=======
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import { useState } from "react";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Header() {
  const usenevigate = useNavigate();
  const [openfunds, setopenfunds] = useState(false);
  const [openuser, setopenuser] = useState(false);
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
  const state = {
    series: [45, 55],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      fill: {
        colors: ["#00d09c", "#5367ff"],
      },
      colors: ["#00d09c", "#5367ff"],

      labels: ["Available Fund", "Used Fund"],

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  const fundsHandle = () => {
    setopenfunds(true);
  };
  const closefunds = () => {
    setopenfunds(false);
  };
<<<<<<< HEAD
=======

  const openuserhandle = () => {
    if (openuser == false) {
      setopenuser(true);
    } else {
      setopenuser(false);
    }
  };
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
  return (
    <div className="Header">
      <div className="Header_left">
        <div className="NIFTY">
          <div className="nifty-name">
            <p className="ni-fty">NIFTY</p>
            <p>NSE INDEX</p>
          </div>
          <div className="nifty-price">
<<<<<<< HEAD
            <p className="nifty-price-live">+1.05</p>
=======
            <p className="nifty-price-live">+1.05 %</p>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
            <p className="rate">17,000</p>
          </div>
        </div>
        <div className="sensex">
          <div className="nifty-name">
            <p className="ni-fty">SENSEX</p>
            <p>BSE INDEX</p>
          </div>
          <div className="nifty-price">
<<<<<<< HEAD
            <p className="nifty-price-live">+1.05</p>
=======
            <p className="nifty-price-live">+1.05 %</p>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
            <p className="rate">56,000</p>
          </div>
        </div>
      </div>
      <div className="Header_right">
        <div className="Header-right-left">
          <div className="Logo">
            <p>Profit King</p>
            <p>
              <CurrencyRupeeIcon />
            </p>
          </div>
        </div>
        <div className="Header-right-right">
          <div className="btn-header">
            <Button variant="contained" onClick={fundsHandle}>
              Funds
            </Button>{" "}
          </div>
          <div className="btn-header">
            <Link target={"_blank"} to="/Countrydata" className="Links">
              <Button variant="contained" endIcon={<OpenInNewIcon />}>
                Country Data
              </Button>
            </Link>
          </div>
          <div className="btn-header">
            <Link target={"_blank"} to="/fundamentals" className="Links">
              <Button variant="contained" endIcon={<OpenInNewIcon />}>
                {" "}
                Fundamental
              </Button>
            </Link>
          </div>
<<<<<<< HEAD
        </div>
      </div>
      <div
        className={`${openfunds && "funds-datas"} ${openfunds && "funds-data"}`}
      >
        <div className="funds-left">
          <p className="closeiconn" onClick={closefunds}>
            <CloseIcon className="close-iconn" />
          </p>
          <p className="Securities">Securities</p>
        </div>
        <div className="funds-right">
          <div className="funds-right-header">
            <p className="my-funds">My Account/Funds</p>
            <p className="Securiti">Securities</p>
          </div>
          <div className="fund-right-body">
            <div className="fund-right-body-left">
              <div className="right-body-fund-box">
                <p className="Avlble-trade">Available to trade</p>
                <p className="Avlble-trade">₹1,028.14</p>
              </div>
              <div className="right-body-fund-box">
                <p className="tm-fund-box">Used margin</p>
                <p className="tm-fund-box">₹ 0.00</p>
              </div>
            </div>

            <div className="fund-right-body-right">
              <div className="right-body-fund-box">
                <p className="tm-fund-box">Total margin</p>
                <p className="tm-fund-box">₹ 1,028.14</p>
              </div>
              <div className="right-body-fund-box">
                <p className="tm-fund-box">Collateral margin </p>
                <p className="tm-fund-box">₹ 0.00</p>
              </div>
              <div className="right-body-fund-box">
                <p className="tm-fund-box">Cash margin</p>
                <p className="tm-fund-box">₹ 1,028.14</p>
              </div>
              <div className="right-body-fund-box">
                <p className="tm-fund-box">Unsettled profits</p>
                <p className="tm-fund-box">₹ 0.00</p>
              </div>
            </div>
          </div>
          <div className="fund-bottom">
            <Chart
              options={state.options}
              series={state.series}
              type="pie"
              width="500"
            />
          </div>
          <p className="total-funds">Total Fund - 50,000</p>
        </div>
      </div>
=======
          <div className="btn-header">
            <IconButton onClick={openuserhandle}>
              <AccountCircleIcon className="userIcon" />
            </IconButton>
          </div>
        </div>
      </div>
      {openuser && (
        <div className="open-user">
          <div
            className="open-user-open-one"
            onClick={() => usenevigate("/Myaccount")}
          >
            <p>My Account</p>
            <p>
              <ManageAccountsIcon />
            </p>
          </div>
          <div className="open-user-open-second">
            <p>Logout</p>
            <p>
              <ExitToAppIcon />
            </p>
          </div>
        </div>
      )}

      {openfunds && (
        <div
          className={`${openfunds && "funds-datas"} ${
            openfunds && "funds-data"
          }`}
        >
          <div className="funds-left">
            <p className="closeiconn" onClick={closefunds}>
              <CloseIcon className="close-iconn" />
            </p>
            <p className="Securities">Securities</p>
          </div>
          <div className="funds-right">
            <div className="funds-right-header">
              <p className="my-funds">My Account/Funds</p>
              <p className="Securiti">Securities</p>
            </div>
            <div className="fund-right-body">
              <div className="fund-right-body-left">
                <div className="right-body-fund-box">
                  <p className="Avlble-trade">Available to trade</p>
                  <p className="Avlble-trade">₹1,028.14</p>
                </div>
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Used margin</p>
                  <p className="tm-fund-box">₹ 0.00</p>
                </div>
              </div>

              <div className="fund-right-body-right">
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Total margin</p>
                  <p className="tm-fund-box">₹ 1,028.14</p>
                </div>
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Collateral margin </p>
                  <p className="tm-fund-box">₹ 0.00</p>
                </div>
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Cash margin</p>
                  <p className="tm-fund-box">₹ 1,028.14</p>
                </div>
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Unsettled profits</p>
                  <p className="tm-fund-box">₹ 0.00</p>
                </div>
              </div>
            </div>
            <div className="fund-bottom">
              <Chart
                options={state.options}
                series={state.series}
                type="pie"
                width="500"
              />
            </div>
            <p className="total-funds">Total Fund - 50,000</p>
          </div>
        </div>
      )}
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
    </div>
  );
}

export default Header;
