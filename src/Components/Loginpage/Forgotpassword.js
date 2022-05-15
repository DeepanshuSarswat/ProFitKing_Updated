import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Forgotpassword.css";
function Forgotpassword() {
  return (
    <div className="Sig-n">
      <div className="Login-h-l Sign-h-l">
        <p>Profit King</p>
        <p>
          <CurrencyRupeeIcon className="pkicon" />
        </p>
      </div>
      <div className="Sign-in-user">
        <p className="Hii">Hi Deepanshu</p>
        <p className="welcome">Welcome back</p>
        <p className="Enter-digit">Enter Your Email</p>
        <p className="input-six">
          <form autoComplete="off">
            <TextField
              required
              id="standard-basic"
              variant="standard"
              fullWidth
              type="email"
              // onChange={(e) => setusername(e.target.value)}
            />
            <p className="Continue-btns">
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                // disabled={!username && !userpassword ? true : false}
              >
                Continue
              </Button>
            </p>
          </form>
        </p>
      </div>
    </div>
  );
}

export default Forgotpassword;
