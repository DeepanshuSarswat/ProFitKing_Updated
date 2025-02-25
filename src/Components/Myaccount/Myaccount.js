import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Myaccount.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Myaccount() {
  const [myData,setmyData] = useState([]);
  async function get_user_data(){
    let response = await fetch('/userdata')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'success')
      setmyData(json['data'])
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }

  useEffect(()=>{
    get_user_data()
  },[])
 
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
              <p className="Myaccount-second">{myData.first_name +" "+ myData.last_name}</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">User Name</p>
              <p className="Myaccount-second">{myData.username}</p>
            </div>

            <div className="Myaccount-N">
              <p className="Myaccount-first"> PAN</p>
              <p className="Myaccount-second">{myData.pan_no}</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">Number</p>
              <p className="Myaccount-second">{myData.phone_no}</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">Email</p>
              <p className="Myaccount-second">{myData.email}</p>
            </div>
            <div className="Myaccount-N">
              <p className="Myaccount-first">Password</p>
              <p className="Myaccount-second"><Link to="/Myaccount/ChangePassword">
                Change Password
              </Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myaccount;
