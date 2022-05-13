import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Sign.css";

function Sign() {
  return (
    <div className="Sig-n">
      <div className="Login-h-l Sign-h-l">
        <p>Profit King</p>
        <p>
          <CurrencyRupeeIcon className="pkicon" />
        </p>
      </div>
      <div className="Sign-in-user">
        <p className="forgot-pin">Forgot PIN?</p>
        <p className="Hii">Hi Deepanshu</p>
        <p className="welcome">Welcome back</p>
        <p className="Enter-digit">Enter 6-digit PIN</p>
        <p className="input-six">
          <TextField
            id="standard-basic"
            variant="standard"
            fullWidth
            type={"number"}
          />
        </p>
        <p className="Continue-btn">
          {/* <button className="Continue-btns" disabled>
           
          </button> */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            //   disabled={!imputvalue ? true : false}
          >
            Continue
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Sign;
