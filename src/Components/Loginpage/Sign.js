<<<<<<< HEAD
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Sign.css";

function Sign() {
=======
import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import "./Sign.css";

function Sign() {
  const [username, setusername] = useState("");
  const [userpassword, setuserpassword] = useState("");
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
  return (
    <div className="Sig-n">
      <div className="Login-h-l Sign-h-l">
        <p>Profit King</p>
        <p>
          <CurrencyRupeeIcon className="pkicon" />
        </p>
      </div>
      <div className="Sign-in-user">
<<<<<<< HEAD
        <p className="forgot-pin">Forgot PIN?</p>
        <p className="Hii">Hi Deepanshu</p>
        <p className="welcome">Welcome back</p>
        <p className="Enter-digit">Enter 6-digit PIN</p>
=======
        <p className="forgot-pin">
          <Link to="Forgotpassword" className="forgot-pins">
            Forgot Password?
          </Link>
        </p>
        <p className="Hii">Hi Deepanshu</p>
        <p className="welcome">Welcome back</p>
        <p className="Enter-digit">Enter Your User Name</p>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
        <p className="input-six">
          <TextField
            id="standard-basic"
            variant="standard"
            fullWidth
<<<<<<< HEAD
            type={"number"}
=======
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
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
          />
        </p>
        <p className="Continue-btn">
          {/* <button className="Continue-btns" disabled>
           
          </button> */}
          <Button
            variant="contained"
            size="large"
            fullWidth
<<<<<<< HEAD
            //   disabled={!imputvalue ? true : false}
=======
            disabled={!username && !userpassword ? true : false}
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
          >
            Continue
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Sign;
