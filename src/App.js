import { BrowserRouter, Routes, Route } from "react-router-dom";
import Technical from "./Components/Technical/Technical";
import Funamental from "./Components/Fundamentalofcompany/Funamental";
import Countrydata from "./Components/Countrydata/Countrydata";
import Loginpage from "./Components/Loginpage/Loginpage";
import Sign from "./Components/Loginpage/Sign";
import CreateAccount from "./Components/Loginpage/CreateAccount";
<<<<<<< HEAD
=======
import Myaccount from "./Components/Myaccount/Myaccount";
import Profitandloss from "./Components/Myaccount/Profitandloss";
import Forgotpassword from "./Components/Loginpage/Forgotpassword";
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Technical />} />
          <Route path="/fundamentals" element={<Funamental />} />
          <Route path="/Countrydata" element={<Countrydata />} />
<<<<<<< HEAD
          <Route path="/Home" element={<Loginpage />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
=======
          <Route path="/Myaccount" element={<Myaccount />} />
          <Route path="/Myaccount">
            <Route path="ProfitandLoss" element={<Profitandloss />} />
          </Route>
          <Route path="/Home" element={<Loginpage />} />
          <Route path="/Home">
            <Route path="Sign" element={<Sign />} />
            <Route path="Sign/Forgotpassword" element={<Forgotpassword />} />
            <Route path="CreateAccount" element={<CreateAccount />} />
          </Route>
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
