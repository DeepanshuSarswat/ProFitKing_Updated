import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import "./Sign.css";

function Sign() {
  const [username, setusername] = useState("");
  const [userpassword, setuserpassword] = useState("");


  async function check_if_user_login(){
    let response = await fetch('/check_userlogin')
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


  const submit_data = ()=>{
      const get_username = username;
      const get_pass = userpassword;
      axios.post('/userlogin', {
        'username':username,
        'password':userpassword
    })
    .then(res => {
        let msg =res['data']['message']
        console.log(msg)
        if(msg=='success'){
          window.location.replace('/Home')
        }

    })
    .catch(err =>{
        alert(err);
    });
  }

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
            type={"password"}
            onChange={(e) => setuserpassword(e.target.value)}
            inputProps={{
    minLength: 8
  }}
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
            onClick = {submit_data}
          >
            Continue
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Sign;
