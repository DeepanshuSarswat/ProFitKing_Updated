import { BrowserRouter, Routes, Route } from "react-router-dom";
import Technical from "./Components/Technical/Technical";
import Funamental from "./Components/Fundamentalofcompany/Funamental";
import Countrydata from "./Components/Countrydata/Countrydata";
import Loginpage from "./Components/Loginpage/Loginpage";
import Sign from "./Components/Loginpage/Sign";
import CreateAccount from "./Components/Loginpage/CreateAccount";
import Myaccount from "./Components/Myaccount/Myaccount";
import Profitandloss from "./Components/Myaccount/Profitandloss";
import Forgotpassword from "./Components/Loginpage/Forgotpassword";
import Verify from "./Components/Loginpage/Verify";
import ChangePasssword from "./Components/Myaccount/ChangePassword";
import Reset from "./Components/Loginpage/Reset";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Loginpage />} />
          <Route path="/">
            <Route path="Sign" element={<Sign />} />
            <Route path="Sign/Forgotpassword" element={<Forgotpassword />} />
            <Route path="CreateAccount" element={<CreateAccount />} />
            <Route path="/reset/:resetId" element={<Reset />}  />
          </Route>

          <Route path="/Home" element={<Technical />} />
          <Route path="/fundamentals" element={<Funamental />} />
          <Route path="/Countrydata" element={<Countrydata />} />
          <Route path="/Myaccount" element={<Myaccount />} />
          
          <Route path="/Myaccount">
            <Route path="ProfitandLoss" element={<Profitandloss />} />
            <Route path="ChangePassword" element={<ChangePasssword />} />
          </Route>
          <Route path="/Verify/:VerifyId" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
