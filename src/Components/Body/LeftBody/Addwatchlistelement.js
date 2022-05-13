import React from "react";
import "./Addwatchlistelement.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
function Addwatchlistelement({
  opensearch,
  setopensearch,
  watchlistData,
  newWatchlisthdr,
}) {
  const [threeword, setthreeeword] = useState(true);
  const [datas, setdatas] = useState(gtData());
  const [filterData, setfilterData] = useState([]);
  const [notfound, setnotfound] = useState(false);

  function gtData() {
    let List = localStorage.getItem("StockLists");

    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }
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
  const Addstocktowatchlist = (e) => {
    if (e in watchlistData[newWatchlisthdr]) {
      console.log("Don't do this");
    } else {
      watchlistData[newWatchlisthdr].push(e);
      console.log(watchlistData[newWatchlisthdr]);
      localStorage.setItem("Watchlistitms", JSON.stringify(watchlistData));
    }
  };
  return (
    <div className="Addwatchlistelement">
      {opensearch && (
        <div className="Inputsearchs">
          <div className="InputSearch_Searchs">
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
            {filterData?.slice(0, 15).map((e, key) => {
              return (
                <div className="Addstocklist">
                  <p
                    className="stockfilters"
                    key={key}
                    //   onClick={() => clickonstock(e.name)}
                  >
                    {e.name.toUpperCase()}
                  </p>
                  <div
                    className="Addbtn"
                    onClick={() => Addstocktowatchlist(e)}
                  >
                    <p className="Add-txt">Add</p>

                    <AddCircleOutlineIcon className="Add-icon" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Addwatchlistelement;
