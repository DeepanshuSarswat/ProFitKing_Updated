import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Loginpage.css";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import { BASE_URL } from "../../Contants/constant";

function Loginpage() {
  async function check_if_user_login(){
    let response = await fetch(BASE_URL + '/check_userlogin')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'yes'){
        window.location.replace('/Home')
      }  
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }

  useLayoutEffect(()=>{
    check_if_user_login();
  },[])
  return (
    <div className="Loginpage">
      <div className="Loginpage-header">
        <div className="Login-h-l">
          <p>Profit King</p>
          <p>
            <CurrencyRupeeIcon className="pkicon" />
          </p>
          <p className="lrn">
            <a target={"_blank"} href="https://zerodha.com/varsity/">
              {" "}
              Learn
            </a>
          </p>
        </div>
        <div className="Login-h-r">
          <div className="creat-acc">
            <button className="creat-acc-btn">
              <Link to="/CreateAccount" className="creat-acc-btn-link">
                Create Account
              </Link>
            </button>
          </div>
          <div className="signin">
            <button className="singn-btn">
              <Link to="/Sign" target={"_blank"}>
                Sign In
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="Body-loginpage">
        <div className="login-body-left">
          <h2 className="login-body-heading">
            Own your future <br></br> with{" "}
            <span className="pk-span">Profit King</span>
          </h2>
          <p className="pk-simple">
            Investing and trading made simple, affordable and accessible for
            you.
          </p>
          <p className="strt-investt">
            <button className="strt-investt-btn">
              <Link to="/CreateAccount">Start Investing</Link>
            </button>
          </p>
        </div>
        <div className="login-body-right">
          <img src="images/invest.svg" className="invest-img" />
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
