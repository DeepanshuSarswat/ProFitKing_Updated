import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ChangePasssword() {
  const [enterpassword,setenterpassword] = useState("");
  const [reenterpassword,setreenterpassword] = useState("");

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

  async function change_pass(){
    let response = await fetch('/changepassword', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'password': enterpassword,
          'confirm_password':reenterpassword
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      if (message == 'success'){
        window.location.replace('/')
      }
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
  }
const handlepassword = (e)=>{
  e.preventDefault();
  change_pass()
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
        <p className="Hii">Hi Deepanshu</p>
        <p className="welcome">Welcome back</p>
        <p className="Enter-digit">Enter Your New Password</p>
        <p className="input-six">
          <form autoComplete="off" onSubmit={handlepassword}>
            <TextField
              required
              id="standard-basic"
              variant="standard"
              fullWidth
              type="password"
              
              onChange={(e) => setenterpassword(e.target.value)}

              inputProps={{
    minLength: 8
  }}
            />
             <p className="Enter-digits">Re-Enter Your New Password</p>
             <TextField
              required
              id="standard-basic"
              variant="standard"
              fullWidth
              inputProps={{
    minLength: 8
  }}
              type="password"
              onChange={(e) => setreenterpassword(e.target.value)}
            />
            <p className="Continue-btns">
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={(enterpassword != reenterpassword)  ? true : false}
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

export default ChangePasssword;
