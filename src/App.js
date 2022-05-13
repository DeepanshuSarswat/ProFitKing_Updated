import { BrowserRouter, Routes, Route } from "react-router-dom";
import Technical from "./Components/Technical/Technical";
import Funamental from "./Components/Fundamentalofcompany/Funamental";
import Countrydata from "./Components/Countrydata/Countrydata";
import Loginpage from "./Components/Loginpage/Loginpage";
import Sign from "./Components/Loginpage/Sign";
import CreateAccount from "./Components/Loginpage/CreateAccount";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Technical />} />
          <Route path="/fundamentals" element={<Funamental />} />
          <Route path="/Countrydata" element={<Countrydata />} />
          <Route path="/Home" element={<Loginpage />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
