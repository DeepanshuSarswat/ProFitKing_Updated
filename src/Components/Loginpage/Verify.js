import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../../Contants/constant";

function Verify() {
    const [Verifyusername, setVerifyusername] = useState("");
    const[verifypage,setverifypage] = useState(false);
    const submit_data = ()=>{
        const get_pid = window.location.href.split("#")[0].split('/')[4]
        axios.post(BASE_URL + `/verify/verifyacc/${get_pid}`, {
          'unamm':Verifyusername
      })
      .then(res => {
          let msg =res['data']['message']
          if(msg=='Success'){
            console.log(msg)
            setverifypage(true)
          }
  
      })
      .catch(err =>{
          alert(err);
      });
    }
    return (
      <div className="Sig-n">
      {verifypage ? 
      (  <div className="cred">
        <p className="cred-text">Your Account Verified Successfully...
        <br></br>
          Your Credentials has been send to your Mail CLick here to </p>
         <p className="cred-link"> <Link to="/Sign" >Login</Link></p>
          </div>)
          :
          <>
        <div className="Login-h-l Sign-h-l">
          <p>Profit King</p>
          <p>
            <CurrencyRupeeIcon className="pkicon" />
          </p>
        </div>
        <div className="Sign-in-user">
        
          <p className="Hii">Hi Deepanshu</p>
          <p className="welcome">Welcome back</p>
          <p className="Enter-digit">Enter Your User Name</p>
          <p className="input-six">
            <TextField
              id="standard-basic"
              variant="standard"
              fullWidth
              type={"text"}
              onChange={(e) => setVerifyusername(e.target.value)}
            />
          </p>
        
          <p className="Continue-btn">
            
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={!Verifyusername ? true : false}
              onClick = {submit_data}
            >
              Continue
            </Button>
          </p>
        </div>
        </>
      }
      
      
      </div>
    );
  }
  
  export default Verify;