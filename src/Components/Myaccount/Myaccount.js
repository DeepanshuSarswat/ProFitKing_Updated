import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Myaccount.css";
import { Link } from "react-router-dom";
function Myaccount() {
  return (
    <div className="Myaccount">
      <div className="Myaccount-header">
        <div className="Myaccount-header-child">
          <div className="header-logo">
            <p>Profit King</p>
            <p>
              <CurrencyRupeeIcon className="rupee-logo" />
            </p>
          </div>
          <div className="header-profile">Profile</div>
        </div>
      </div>
      <div className="Myaccount-body">
        <div className="Myaccount-body-content">
          <div className="Myaccount-child">
            <div className="Myaccount-N">
              <p className="Myaccount-first">Name</p>
              <p className="Myaccount-second">DEEPANSHU</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">User Name</p>
              <p className="Myaccount-second">DEEPANSHU@123</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first"> PAN</p>
              <p className="Myaccount-second">FYNPD57887D</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">Password</p>
              <p className="Myaccount-second">FYNPD57887D</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">Number</p>
              <p className="Myaccount-second">8899638900</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">Email</p>
              <p className="Myaccount-second">sarswatdeepanshu@gmail.com</p>
            </div>
          </div>
        </div>
        <p className="p-and-l">
          <Link to="/Myaccount/ProfitandLoss" target={"_blank"}>
            Your Profit and Loss
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Myaccount;
