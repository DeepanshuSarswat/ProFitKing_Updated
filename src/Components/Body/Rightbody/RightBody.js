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

const useStyle = makeStyles({
  formconrtrol: {
    height: 40,
    fill: "red",
  },
  IconColor: {
    color: "rgb(35, 127, 206)",
  },
});
function RightBody() {
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
  const [age, setAge] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [threeword, setthreeeword] = useState(true);
  const [notfound, setnotfound] = useState(false);
  const [stocksymbol, setstocksymbol] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [exchange, setexchange] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
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
        console.log(e);
        setstocksymbol(e.symbol);
        setcompanyname(e.name);
        setexchange(e.exchange);
        setopensearch(false);
      }
    });
  };
  console.log(stocksymbol);
  return (
    <div className="rightbodycontent">
      <div className="Rightbody">
        <div className="rightheader">
          <div className="rightheaderleft">
            <div className="rightheaderlefticon">
              {" "}
              <IconButton>
                <WidgetsIcon className="WidgetsIcon" />
              </IconButton>
            </div>
            <div className="rightheaderlefticon">
              <IconButton onClick={() => setopensearch(true)}>
                {" "}
                <SearchIcon />{" "}
              </IconButton>
            </div>
            <div className="rightheaderlefticon">
              <IconButton>
                <ModeEditOutlineIcon />
              </IconButton>
            </div>
            <div className="rightheaderlefticon">
              <IconButton>
                <AddIcon />
              </IconButton>
            </div>
            <div className="rightheaderlefticon">
              <IconButton>
                <CommentIcon />
              </IconButton>
            </div>
          </div>
          <div className="rightheaderright">
            <div className="optiontime">
              <FormControl sx={{ m: 1, minWidth: 20 }}>
                <Select
                  className={classes.formconrtrol}
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                  onClick={() => setopensearch(false)}
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
              {filterData?.map((e, key) => {
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
        <div className="rightbodycontents">
          <RightBodyChart
            stocksymbol={stocksymbol}
            companyname={companyname}
            exchange={exchange}
          />
        </div>
      </div>
    </div>
  );
}

export default RightBody;
