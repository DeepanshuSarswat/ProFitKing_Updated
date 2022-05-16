import * as React from "react";
import "./LeftBody.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SortIcon from "@mui/icons-material/Sort";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useState } from "react";
import { makeStyles } from "@mui/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Addwatchlistelement from "./Addwatchlistelement";
const color = "blue";
const useStyle = makeStyles({
  formconrtrol: {
    height: 40,
    fill: "red",
  },
  IconColor: {
    color: "rgb(35, 127, 206)",
  },
  pinubox: {
    color: "red",
    marginLeft: "auto",
  },
});
function LeftBody() {
  const [openlist, setopenlist] = useState(false);
  const [watchlisthdr, setwatchlsthdr] = useState("");
  let newWatchlisthdr = watchlisthdr
    .replace(/[, ]+/g, "", " ", ",")
    .toLowerCase();
  function gtData() {
    let List = localStorage.getItem("Watchlistitms");

    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }

  const [Watchlistitmdata, setWatchlistitmdata] = useState([gtData()]);
  console.log(Watchlistitmdata);
  const classes = useStyle();
  const [openwatchlistinput, setopenwatchlistinput] = useState(false);
  const [watchlistname, setwatchlistname] = useState([]);
  const [inputwatchlist, setinputwatchlist] = useState("");
  const [watchlstId, setwatchlstId] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const [opensearch, setopensearch] = useState(false);

  let watchlistData = {};
  const addwatchlist = () => {
    setopenwatchlistinput(true);
  };
  const hadelclosIcon = () => {
    setopenwatchlistinput(false);
    console.log(openwatchlistinput);
    setinputwatchlist("");
  };
  const Submitvalue = (e) => {
    e.preventDefault();
    setwatchlsthdr("Your Watchlist");
    if (isEditing && inputwatchlist.trim().length != 0) {
      setwatchlistname(
        watchlistname.map((e) => {
          if (e.id == watchlstId) {
            return { ...e, title: inputwatchlist };
          }
          return e;
        })
      );
      setinputwatchlist("");
      setwatchlstId("");
      setisEditing(false);
    } else if (inputwatchlist.trim().length != 0) {
      setwatchlistname([
        ...watchlistname,
        { id: new Date().getTime().toString(), title: inputwatchlist },
      ]);
      setinputwatchlist("");
    } else {
      console.log("Wrong Input");
    }
  };
  const DeleteItms = (id) => {
    let newWatchlst = watchlistname.filter((e) => e.id != id);
    setwatchlistname(newWatchlst);
  };
  const watchlisthandkle = () => {
    if (openlist === false) {
      setopenlist(true);
    } else {
      setopenlist(false);
    }
  };
  const hanleedit = (id) => {
    let newData = watchlistname.find((e) => e.id === id);

    setinputwatchlist(newData.title);
    setwatchlstId(id);
    setisEditing(true);
  };
  const Addwatchlstitms = () => {
    if (opensearch) {
      setopensearch(false);
    } else {
      setopensearch(true);
    }
  };
  watchlistname.forEach((e) => {
    watchlistData[e.title.replace(/[, ]+/g, "", " ", ",").toLowerCase()] = [];
  });
  console.log(Watchlistitmdata);
  return (
    <div className="leftbodycontent">
      <div className="Leftbodyheader">
        <div className="left-body-content">
          <div className="yourwatchlist">
            <div
              className="watclistinput"
              onClick={watchlisthandkle}
              id={openlist && "Activeclass"}
            >
              {watchlistname.length > 0 && setwatchlsthdr != "" ? (
                <p>{watchlisthdr.toUpperCase()}</p>
              ) : (
                <p>YOUR WATCHLIST</p>
              )}

              <p className="drop-down-icon">
                {openlist ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </p>
            </div>
          </div>
          <IconButton>
            <SortIcon />
          </IconButton>
          <IconButton onClick={Addwatchlstitms}>
            <AddCircleIcon className={classes.IconColor} />
          </IconButton>
        </div>
      </div>
      {openlist && (
        <div className="wish-lst-bottom">
          {watchlistname.length == 0 && (
            <div className="emptywatchlst">
              <div className="Emptyimgcontainer">
                <img
                  src="https://pro.upstox.com/assets/empty.svg"
                  className="emptyimg"
                />
                <p className="emptytagline">It’s empty in here.</p>
              </div>
            </div>
          )}
          <div className="watchlist">
            {watchlistname?.map((e, idx) => {
              return (
                <div className="watch-lst-data" key={idx}>
                  <p
                    onClick={() => {
                      setopenlist(false);
                      setwatchlsthdr(e.title);
                    }}
                  >
                    {e.title.toUpperCase()}
                  </p>
                  <div className="watchlsticons">
                    <DriveFileRenameOutlineIcon
                      className="editicons"
                      onClick={() => hanleedit(e.id)}
                    />
                    <DeleteOutlineIcon
                      className="Dlticons"
                      onClick={() => DeleteItms(e.id)}
                    />
                  </div>
                </div>
              );
            })}
            {openwatchlistinput ? (
              <div className="watchlistinput">
                <form onSubmit={Submitvalue}>
                  <input
                    className="takeinput"
                    placeholder="Name This Watchlist"
                    type="text"
                    value={inputwatchlist}
                    onChange={(e) => setinputwatchlist(e.target.value)}
                  />
                </form>

                <div className="closeicon" onClick={hadelclosIcon}>
                  <CloseIcon className="closeinput" />
                </div>
              </div>
            ) : (
              <div className="watchlistinput" onClick={addwatchlist}>
                <p className="createwatchlisttitle">Create new watchlist</p>
                <AddCircleIcon className="IconColors" />
              </div>
            )}
          </div>
        </div>
      )}
      <div>
        <Addwatchlistelement
          opensearch={opensearch}
          setopensearch={setopensearch}
          watchlistData={watchlistData}
          newWatchlisthdr={newWatchlisthdr}
        />
      </div>
      <div className="LeftBody">
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
        <p>Deepanshu</p>
      </div>
    </div>
  );
}

export default LeftBody;
