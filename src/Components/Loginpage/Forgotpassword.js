import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Forgotpassword.css";
import CircularProgress from '@mui/material/CircularProgress';

function Forgotpassword() {
  const [enteremail,setenteremail] = useState("");
  const [message,setmessage] = useState("");
  const [loading,setloading] = useState(false)
  const getCookie =(name) =>{
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  const csrftoken = getCookie('X-CSRFToken');

  async function send_reset_link(){
    let response = await fetch('/password_reset', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'email': enteremail,
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      if(message=='success'){
        setenteremail("")
        setmessage("please Check Your E-mail Inbox 🙂")
        setloading(false)
        
      }
      else{
      setmessage(message)
      setloading(false)
      }
  }
  else {
      alert("HTTP-Error: " + response.status);
      
  }
  }




  const handlemail=(e)=>{
    setloading(true)
    e.preventDefault();
    send_reset_link()
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
        <p className="Hii">Hi User</p>
        <p className="welcome">Welcome back</p>
        <p className="Enter-digit">Enter Your Email</p>
        <p className="input-six">
          <form autoComplete="off" onSubmit={handlemail}>
            <TextField
              required
              id="standard-basic"
              variant="standard"
              fullWidth
              type="email"
              disabled={loading?true:false}
              onChange={(e) => setenteremail(e.target.value)}
            />
            <p className="Continue-btns">
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={enteremail=="" || loading ? true : false}
              >
               { loading? <CircularProgress color="inherit" className="loading" /> :"Continue" }
              </Button>
              
            </p>
          </form>
        </p>
        {
        message !="" &&(
          <p className="msg">{message}</p>
        )
      
      }
      </div>
    </div>
  );
}

export default Forgotpassword;
