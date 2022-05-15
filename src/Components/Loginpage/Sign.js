import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import "./Sign.css";

function Sign() {
  const [username, setusername] = useState("");
  const [userpassword, setuserpassword] = useState("");
  return (
    <div className="Sig-n">
      <div className="Login-h-l Sign-h-l">
        <p>Profit King</p>
        <p>
          <CurrencyRupeeIcon className="pkicon" />
        </p>
      </div>
      <div className="Sign-in-user">
        <p className="forgot-pin">
          <Link to="Forgotpassword" className="forgot-pins">
            Forgot Password?
          </Link>
        </p>
        <p className="Hii">Hi Deepanshu</p>
        <p className="welcome">Welcome back</p>
        <p className="Enter-digit">Enter Your User Name</p>
        <p className="input-six">
          <TextField
            id="standard-basic"
            variant="standard"
            fullWidth
            type={"text"}
            onChange={(e) => setusername(e.target.value)}
          />
        </p>
        <p className="Enter-digit">Enter Your Password</p>
        <p className="input-six">
          <TextField
            id="standard-basic"
            variant="standard"
            fullWidth
            type={"text"}
            onChange={(e) => setuserpassword(e.target.value)}
          />
        </p>
        <p className="Continue-btn">
          {/* <button className="Continue-btns" disabled>
           
          </button> */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!username && !userpassword ? true : false}
          >
            Continue
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Sign;
