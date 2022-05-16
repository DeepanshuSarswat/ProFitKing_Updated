import React from "react";
import "./SymbolDetail.css";
import InfoIcon from "@mui/icons-material/Info";
function SymbolDetail({
  setopenoverview,
  setsymbolDetails,
  setstockinfo,
  setbuyorsells,
  setclickonBuy,
  setclickonsell,
}) {
  const Buythestock = () => {
    setopenoverview(true);
    setsymbolDetails(false);
    setbuyorsells(true);
    setstockinfo(false);
    setclickonBuy(true);
    setclickonsell(false);
  };
  const Sellthestock = () => {
    setopenoverview(true);
    setsymbolDetails(false);
    setbuyorsells(true);
    setstockinfo(false);
    setclickonsell(true);
    setclickonBuy(false);
  };
  const symbolinfothestock = () => {
    setopenoverview(true);
    setsymbolDetails(false);
    setstockinfo(true);
    setbuyorsells(false);
  };

  return (
    <div className="symbolDetail">
      <div className="buy-sell">
        <div className="buy-stocks" onClick={Buythestock}>
          <div className="buy-stock">
            <p className="B">B</p>
            <p className="B-buy">Buy</p>
          </div>
        </div>
        <div className="sell-stocks" onClick={Sellthestock}>
          <div className="sell-stock">
            <p className="S">S</p>
            <p className="S-sell">Sell</p>
          </div>
        </div>
      </div>
      <div className="symbol-detail-info">
        <div className="symbol-information" onClick={symbolinfothestock}>
          <div className="buy-stockk">
            <p className="Icons-infos">
              <InfoIcon className="Icons-info" />
            </p>
            <p>Symbol Info</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymbolDetail;
