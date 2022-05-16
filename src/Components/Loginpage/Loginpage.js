import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Loginpage.css";
import { Link } from "react-router-dom";
function Loginpage() {
  return (
    <div className="Loginpage">
      <div className="Loginpage-header">
        <div className="Login-h-l">
          <p>Profit King</p>
          <p>
            <CurrencyRupeeIcon className="pkicon" />
          </p>
          <p className="lrn">
<<<<<<< HEAD
            <a href="https://zerodha.com/varsity/"> Learn</a>
=======
            <a target={"_blank"} href="https://zerodha.com/varsity/">
              {" "}
              Learn
            </a>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
          </p>
        </div>
        <div className="Login-h-r">
          <div className="creat-acc">
            <button className="creat-acc-btn">
<<<<<<< HEAD
              <Link to="/CreateAccount" className="creat-acc-btn-link">
=======
              <Link to="/Home/CreateAccount" className="creat-acc-btn-link">
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
                Create Account
              </Link>
            </button>
          </div>
          <div className="signin">
            <button className="singn-btn">
<<<<<<< HEAD
              <Link to="/Sign" target={"_blank"}>
=======
              <Link to="/Home/Sign" target={"_blank"}>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
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
<<<<<<< HEAD
              <Link to="/CreateAccount">Start Investing</Link>
=======
              <Link to="/Home/CreateAccount">Start Investing</Link>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
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
