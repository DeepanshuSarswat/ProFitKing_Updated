import * as React from "react";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./Header.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import { useState } from "react";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLayoutEffect } from "react";
import { defaultwatchName, NetProfitName } from "../../features/stockSlice";
import { useDispatch } from "react-redux";
function Header() {
 
  const dispatch = useDispatch();
  const usenevigate = useNavigate();
  const [openfunds, setopenfunds] = useState(false);
  const [openuser, setopenuser] = useState(false);
  const [webData,setwebData] = useState([]);
  const [webDatas,setwebDatas] = useState([]);
  const [accountblnc,setaccountblnc] = useState([]);
  const [appleprice,setappleprice] =  useState("");
  const [Infyprice,setInfyprice] =  useState("");
  const [tRPprice,settRPprice] =  useState("");
  const state = {
    series: [accountblnc.account_balance, accountblnc.used_fund],
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

  const openuserhandle = () => {
    if (openuser == false) {
      setopenuser(true);
    } else {
      setopenuser(false);
    }
  };

  async function check_if_user_login(){
    let response = await fetch('/check_userlogin')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'no'){
        window.location.replace('/')
      }  
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }

  async function live_stock_data(){
    let ws = new WebSocket(
         "wss://ws.twelvedata.com/v1/quotes/price?apikey=cc142ccd11b0460985ac8e6daff8f278"
      );
    ws.onopen = function () {
      console.log("websocket is open now..");
      ws.send("message");
      call_data();
    };
    ws.onmessage = function (event) {
      console.log("message recieve from server...", event);
      let web_data = JSON.parse(event['data'])
      // console.log(web_data.symbol)
      setwebDatas(web_data);
      console.log(web_data)
       if(web_data.symbol =="AAPL"){
        setappleprice(web_data.price)
    }
    else if(web_data.symbol =="INFY"){
      setInfyprice(web_data.price)
    }
    else{
      settRPprice(web_data.price)
    }
    };
    ws.onclose = function (event) {
      console.log("server disconnected...");
    };
    
    function call_data() {
      ws.send(
        JSON.stringify({ action: "subscribe",  "params": {
          "symbols": "AAPL,INFY,TRP"
          } })
      );
    }


    // {"event":"price","symbol":"BTC/USD","currency_base":"Bitcoin","currency_quote":"US Dollar","exchange":"Coinbase Pro","type":"Digital Currency","timestamp":1653116988,"price":29299.0,"bid":29299.0,"ask":29299.0,"day_volume":28306}
  }

  // setInterval(()=>{
  //   live_stock_data()
  //   },20000)
  
  useLayoutEffect(()=>{
    check_if_user_login()
    live_stock_data()

  },[])

  async function get_profit_list(){
    let response = await fetch('/GetProfitList')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'success'){
      let share_data = json['share_data'];
      console.log(share_data, "happpy");
      
      setwebData(share_data)
    }
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }

  useLayoutEffect(()=>{
    get_profit_list();
  },[])


  async function logout_user(){
    let response = await fetch('/userlogout')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'successfully logged out which was.'){
        window.location.replace('/')
      }
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }


 

 const LogoutApp = ()=>{
   logout_user()
   dispatch(NetProfitName())
 }

 async function get_balances(){
  let response = await fetch('/get_balances')
  if (response.ok) {
    let json = await response.json();
    let message = json['message'];
    console.log(json, "happpy-json");
    
    if (message == 'success'){
      setaccountblnc(json['data'])}
}
else {
    alert("HTTP-Error: " + response.status);
}

}

useLayoutEffect(()=>{
  get_balances()
  dispatch(NetProfitName(get_balances))
},[])


let allpricess = [appleprice,Infyprice];
let allthreeprices  = [appleprice,Infyprice,tRPprice]

React.useEffect(()=>{
  dispatch(defaultwatchName(allthreeprices))
},[appleprice])


  return (
    <div className="Header">
      <div className="Header_left">
      {
        (appleprice !=undefined && Infyprice !=undefined) || ((appleprice !="" && Infyprice !="")) ?

        webData.slice(0,2)?.map((e,idx)=>{
          let percentage = (((e.cmp - allpricess[idx])/e.cmp)*100).toFixed(2)
           return(
            <div className="NIFTY">
          <div className="nifty-name">
            <p className="ni-fty">{e.symbol}</p>
            <p className="exchange">{e.exchange}</p>
          </div>
          <div className="nifty-price">
            <p className={(e.cmp - allpricess[idx]) >0? "nifty-price-live-lst-headergreen" :"nifty-price-live-lst-headerred"}
            
            // {"nifty-price-live-headergreen"}
            >{((e.cmp - allpricess[idx])/(e.cmp)).toFixed(2)} %</p>
            <p className="rate">{allpricess[idx]}</p>
          </div>
        </div> 
           )
        })
        :
        webData.slice(0,2)?.map((e)=>{
           return(
            <div className="NIFTY">
          <div className="nifty-name">
            <p className="ni-fty">{e.symbol}</p>
            <p className="exchange">{e.exchange}</p>
          </div>
          <div className="nifty-price">
            <p className={e.stock_diff>0? "nifty-price-live-lst-headergreen" :"nifty-price-live-lst-headerred"}
            
            // {"nifty-price-live-headergreen"}
            >{e.percent} %</p>
            <p className="rate">{e.cmp}</p>
          </div>
        </div> 
           )
        })
      }
      
        
      
      
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
          <div className="open-user-open-second" onClick={LogoutApp}>
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
                  <p className="Avlble-trade">₹ {accountblnc.account_balance}</p>
                </div>
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Used margin</p>
                  <p className="tm-fund-box">₹ {accountblnc.used_fund}</p>
                </div>
              </div>

              <div className="fund-right-body-right">
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Total margin</p>
                  <p className="tm-fund-box">₹ {accountblnc.account_balance}</p>
                </div>
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Collateral margin </p>
                  <p className="tm-fund-box">₹ 0.00</p>
                </div>
                <div className="right-body-fund-box">
                  <p className="tm-fund-box">Cash margin</p>
                  <p className="tm-fund-box">₹ {accountblnc.account_balance}</p>
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
            {/* <p className="total-funds">Total Fund - 50,000</p> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
