import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./RightBody.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SearchIcon from "@mui/icons-material/Search";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddIcon from "@mui/icons-material/Add";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import RightBodyChart from "./RightBodyChart";
import CloseIcon from "@mui/icons-material/Close";
import SymbolDetail from "./SymbolDetail";
import Overview from "./Overview";
import Rightbodyfooter from "./Rightbodyfooter";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useSelector } from "react-redux";
import { companyName, companySelect, exchangeName, exchangeSelect, stockSelect } from "../../../features/stockSlice";
import { useDispatch } from "react-redux";
import { stockName } from "../../../features/stockSlice";
const useStyle = makeStyles({
  formconrtrol: {
    height: 40,
    fill: "red",
  },
  IconColor: {
    color: "rgb(35, 127, 206)",
  },
});
function RightBody({ zoom, setzoom }) {
  let dispatch = useDispatch();
  let stock_Name = useSelector(stockSelect);
  let company_Name = useSelector(companySelect);
  let exchange_Name = useSelector(exchangeSelect)
  
  function gtData() {
    let List = localStorage.getItem("StockLists");

    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }

  const [opensearch, setopensearch] = useState(false);
  const classes = useStyle();
  const timeframecategory = [
    "1min",
    "5min",
    "15min",
    "30min",
    "45min",
    "1h",
    "2h",
    "4h",
    "8h",
    "1day",
    "1week",
    "1month",
  ];
  const [filterData, setfilterData] = useState([]);
  const [chartype, setcharttype] = useState("candlestick");
  const [threeword, setthreeeword] = useState(true);
  const [notfound, setnotfound] = useState(false);
  const [stocksymbol, setstocksymbol] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [exchange, setexchange] = useState("");
  let [timeframe, settimeframe] = useState("1day");
  const [chartchange, setchartchange] = useState(false);
  const [symbolDetails, setsymbolDetails] = useState(false);
  const [openoverview, setopenoverview] = useState(false);
  const [stockinnfo, setstockinfo] = useState(false);
  const [buyorsells, setbuyorsells] = useState(false);
  const [clickonBuy, setclickonBuy] = useState(false);
  const [clickonSell, setclickonsell] = useState(false);
  const [openholding, setopenholding] = useState(false);
  const [fullscreen, setfullscreen] = useState(false);
  const timeframeChange = (event) => {
    settimeframe(event.target.value);
  };
  const candlechartChange = (event) => {
    setcharttype(event.target.value);
    if (event.target.value === "line") {
      setchartchange(true);
    } else {
      setchartchange(false);
    }
  };
  const [datas, setdatas] = useState(gtData());

  const handelfilter = (e) => {
    const searchword = e.target.value;
    if (searchword.length > 0) {
      setthreeeword(false);
    }
    const newFilter = datas.filter((data) => {
      return data.name
        .replace(/[, ]+/g, "", " ", ",")
        .toLowerCase()
        .includes(searchword.replace(/[, ]+/g, "", " ", ",").toLowerCase());
    });
    setfilterData(newFilter);
    if (searchword.length > 0 && newFilter.length === 0) {
      setnotfound(true);
    }
    if (searchword === "") {
      setfilterData([]);
      setthreeeword(true);
      setnotfound(false);
    }
    if (searchword != "" && newFilter.length > 0) {
      setnotfound(false);
    }
  };
  useEffect(() => {
    fetch("https://api.twelvedata.com/stocks")
      .then((response) => response.json())
      .then((data) => {
        let newdata = data.data;
        let newDatas = newdata.filter((e) => e.country == "United States");

        localStorage.setItem("StockLists", JSON.stringify(newDatas));
      });
  }, []);
  const clickonstock = (data) => {
    datas.forEach((e) => {
      if (e.name == data) {
        localStorage.setItem("clickedstocks", JSON.stringify(e));

        setstocksymbol(e.symbol);
        setcompanyname(e.name);
        setexchange(e.exchange);
        setopensearch(false);
        setfilterData([]);
        setthreeeword(true);
        dispatch(stockName(e.symbol));
        
  dispatch(companyName(e.name));
  dispatch(exchangeName(e.exchange));
      }
    });
  };

  const stockinfohanle = () => {
    if (symbolDetails) {
      setsymbolDetails(false);
    } else {
      setsymbolDetails(true);
    }
  };
  const handlezoom = () => {
    if (zoom == false) {
      setzoom(true);
    } else {
      setzoom(false);
    }
  };
  
  return (
    <div className="rightbodycontent">
      <div className="Rightbody">
        <div className="rightheader">
          <div className="rightheaderleft">
            <div className="rightheaderlefticon">
              {" "}
              <IconButton onClick={stockinfohanle}
              disabled = {stock_Name == ""? true:false}
              >
                <WidgetsIcon className="WidgetsIcon" />
              </IconButton>
            </div>
            <div className="rightheaderlefticon">
              <IconButton
                onClick={() => {
                  setopensearch(true);
                  setsymbolDetails(false);
                }}
              >
                {" "}
                <SearchIcon />{" "}
              </IconButton>
            </div>
            <div className="rightheaderlefticon">
              <IconButton onClick={handlezoom}>
                {zoom ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
              </IconButton>
            </div>
          </div>
          <div className="rightheaderright">
            <div className="optiontime">
              <FormControl sx={{ m: 1, minWidth: 20 }}>
                <Select
                  disabled={stock_Name == "" ? true : false}
                  className={classes.formconrtrol}
                  value={timeframe}
                  onChange={(e) => timeframeChange(e)}
                  displayEmpty
                >
                  {timeframecategory.map((data) => {
                    return (
                      <MenuItem value={data}>{data.toUpperCase()}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 20 }}>
                <Select
                  disabled={stock_Name == "" ? true : false}
                  className={classes.formconrtrol}
                  value={chartype}
                  onChange={(e) => candlechartChange(e)}
                  displayEmpty
                >
                  <MenuItem value="candlestick">CANDLESTICK</MenuItem>
                  <MenuItem value="line">LINE</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        {opensearch && (
          <div className="Inputsearch">
            <div className="InputSearch_Search">
              <div className="closeIconButton">
                <CloseIcon
                  className="crossInputIcon"
                  onClick={() => {
                    setopensearch(false);
                  }}
                />
              </div>

              <div className="inputbox">
                <input
                  className="inputtserch"
                  placeholder="Which scrip are you looking for?"
                  type="text"
                  // value={symbol}
                  onChange={handelfilter}
                />

                <SearchIcon className="serchstocks" />
              </div>
            </div>
            <div className="InputSearch_recomm">
              {threeword && (
                <p className="Write3word">
                  Enter at least 3 characters in the Search box above to see
                  results here.
                </p>
              )}
              {notfound && (
                <>
                  <div className="notfoundcontainer">
                    <img
                      className="notfoundimage"
                      src="https://pro.upstox.com/assets/empty.svg"
                    />
                  </div>
                  <p className="Write3word">
                    We searched high and low,but couldn’t find anything.Try
                    another keyword?
                  </p>
                </>
              )}
              {filterData?.slice(0, 15).map((e, key) => {
                return (
                  <p
                    className="stockfilter"
                    key={key}
                    onClick={() => clickonstock(e.name)}
                  >
                    {e.name.toUpperCase()}
                  </p>
                );
              })}
            </div>
          </div>
        )}
        {symbolDetails && (
          <div className="symbolDetails">
            <SymbolDetail
              setopenoverview={setopenoverview}
              setsymbolDetails={setsymbolDetails}
              setstockinfo={setstockinfo}
              setbuyorsells={setbuyorsells}
              setclickonBuy={setclickonBuy}
              setclickonsell={setclickonsell}
           
            />
          </div>
        )}

        <div
          className={openoverview ? "rightbodycontents" : "rightbodycontent"}
        >
          <RightBodyChart
            stocksymbol={stocksymbol}
            companyname={companyname}
            stock_Name={stock_Name}
            exchange={exchange}
            timeframe={timeframe}
            chartchange={chartchange}
            chartype={chartype}
            openholding={openholding}
            fullscreen={fullscreen}
            zoom={zoom}
            exchange_Name={exchange_Name}
              company_Name={company_Name}
          />
          {openoverview && (
            <div className="buy-sell-overview">
              <Overview
                setopenoverview={setopenoverview}
                stockinnfo={stockinnfo}
                buyorsells={buyorsells}
                clickonBuy={clickonBuy}
                clickonSell={clickonSell}
                setstockinfo={setstockinfo}
                setbuyorsells={setbuyorsells}
                setclickonBuy={setclickonBuy}
                setclickonsell={setclickonsell}
              />
            </div>
          )}
        </div>
      </div>
      <div className="right-bottom">
        <Rightbodyfooter
          setopenholding={setopenholding}
          openholding={openholding}
          setfullscreen={setfullscreen}
          fullscreen={fullscreen}
        />
      </div>
    </div>
  );
}

export default RightBody;
