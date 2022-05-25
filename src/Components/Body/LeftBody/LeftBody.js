import * as React from "react";
import "./LeftBody.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SortIcon from "@mui/icons-material/Sort";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Addwatchlistelement from "./Addwatchlistelement";
import axios from "axios";
import { companyName, defaultwatchSelect, exchangeName, exchangeSelect, stockName, stockSelect } from "../../../features/stockSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
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
  const liveDData = useSelector(defaultwatchSelect);
  let stock_name = useSelector(exchangeSelect);
  const dispatch = useDispatch();
  const [openlist, setopenlist] = useState(false);
  const [watchlisthdr, setwatchlsthdr] = useState("ProFit King");
 
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
  
  const classes = useStyle();
  const [openwatchlistinput, setopenwatchlistinput] = useState(false);
  const [watchlistname, setwatchlistname] = useState([]);
  const [inputwatchlist, setinputwatchlist] = useState("");
  const [watchlstId, setwatchlstId] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const [opensearch, setopensearch] = useState(false);
  const [watchlstDataa,setwatchlstDataa] = useState([]);
const [watchlstelement,setwatchlstelement] = useState([]);
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
    // setwatchlsthdr("Your Watchlist");
    if (isEditing && inputwatchlist.trim().length != 0) {
      setwatchlstDataa(
        watchlstDataa.map((e) => {
          if (e.id == watchlstId) {
            update_wtachlist(watchlstId,inputwatchlist)
            return { ...e, name: inputwatchlist };
          }
       
          return e;
        })
      );
      setinputwatchlist("");
      setwatchlstId("");
      setisEditing(false);
    } else if (inputwatchlist.trim().length != 0) {
      add_watch([ 
        ...watchlistname,
        { id: new Date().getTime().toString(), title: inputwatchlist },
      ],inputwatchlist)
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
    let newWatchlst = watchlstDataa.filter((e) => e.id != id);
    setwatchlstDataa(newWatchlst);
    delete_watch_list(id)
  };
  const watchlisthandkle = () => {
    if (openlist === false) {
      setopenlist(true);
    } else {
      setopenlist(false);
    }
  };
  const hanleedit = (name,id) => {
    // let newData = watchlistname.find((e) => e.id === id);
    setisEditing(true);
    setopenwatchlistinput(true);
    setinputwatchlist(name);
    setwatchlstId(id);
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

  async function get_watch_list(){
    let response = await fetch('/GetWatchList')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'success'){
      let share_data = json['share_data'];
      setwatchlstelement(share_data)
      setwatchlstDataa(json['data'])}
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }

  async function update_wtachlist(id,name){
    let response = await fetch('/EditWatchList', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'id': id,
          'name':name
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      console.log(message)
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
  }

  async function delete_watch_list(id){
    let response = await fetch('/deleteWatchList', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'id': id,
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      console.log(message)
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
  }


  useEffect(()=>{
    get_watch_list()
  },[])
  
 
  


  async function add_watch(e,f){
    let response = await fetch('/CreateWatchList', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'name': f
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      get_watch_list()
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
  }
const Stockwatchlsthanle = (e)=>{
  dispatch(stockName(e.symbol));
  console.log(e.company_name)
  dispatch(companyName(e.company_name));
  dispatch(exchangeName(e.exchange));
}

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
              { watchlisthdr != "" ? (
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
          {watchlstDataa.length == 0 && (
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
            {watchlstDataa?.map((e, idx) => {
              return (
                <div className="watch-lst-data" key={idx}>
                  <p
                    onClick={() => {
                      setopenlist(false);
                      setwatchlsthdr(e.name);
                    }}
                  >
                    {e.name.toUpperCase()}
                  </p>
                  <div className="watchlsticons">
                    <DriveFileRenameOutlineIcon
                      className="editicons"
                      onClick={() => hanleedit(e.name,e.id)}
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
          get_watch_list={get_watch_list}
          opensearch={opensearch}
          setopensearch={setopensearch}
          watchlistData={watchlistData}
          newWatchlisthdr={newWatchlisthdr}
          watchlisthdr={watchlisthdr}
          setwatchlstelement={setwatchlstelement}
        />
      </div>
       <div >
        {
          watchlstelement.map((e,id)=>{
            if((liveDData[0] !=undefined && liveDData[1] != undefined && liveDData[2]!=undefined) 
            
             ){
              
                if((e.watchlist == watchlisthdr) && watchlisthdr == "ProFit King"){
              return(
                <div className="LeftBody" onClick={()=>Stockwatchlsthanle(e)}>
                  <div >
                    <p className="lst-header">{e.symbol}</p>
                    <p className="lst-body">{e.exchange}</p>
                  </div>
                  <div>
                  <p className={e.cmp - liveDData[id]>0? "lst-headergreen" :"lst-headerred"}>{liveDData[id]}</p>
                   
                    <p className="lst-body">{(e.cmp - liveDData[id]).toFixed(2)}({((e.cmp - liveDData[id])/(e.cmp)).toFixed(2)} %)</p>
                  </div>
                 
                
                </div>
              )

            }
            if(e.watchlist == watchlisthdr){
              return(
                <div className="LeftBody" onClick={()=>Stockwatchlsthanle(e)}>
                  <div >
                    <p className="lst-header">{e.symbol}</p>
                    <p className="lst-body">{e.exchange}</p>
                  </div>
                  <div>
                  <p className={e.stock_diff>0? "lst-headergreen" :"lst-headerred"}>{e.cmp}</p>
                   
                    <p className="lst-body">{e.stock_diff}({e.percent}%)</p>
                  </div>
                 
                
                </div>
              )

            }
              
            }
            else{
              if(e.watchlist == watchlisthdr){
              return(
                <div className="LeftBody" onClick={()=>Stockwatchlsthanle(e)}>
                  <div >
                    <p className="lst-header">{e.symbol}</p>
                    <p className="lst-body">{e.exchange}</p>
                  </div>
                  <div>
                  <p className={e.stock_diff>0? "lst-headergreen" :"lst-headerred"}>{e.cmp}</p>
                   
                    <p className="lst-body">{e.stock_diff}({e.percent}%)</p>
                  </div>
                 
                
                </div>
              )

            }
            }
          
           
       
          })
        }
     
 
      </div> 
    </div>
  );
}

export default LeftBody;
