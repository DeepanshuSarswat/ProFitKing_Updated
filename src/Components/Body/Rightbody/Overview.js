import * as React from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import "./Overview.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { getorderersSelect, NetprofitSelect, stockSelect } from "../../../features/stockSlice";
import { useLayoutEffect } from "react";
import { BASE_URL } from "../../../Contants/constant";


function Overview({
  setopenoverview,
  stockinnfo,
  buyorsells,
  clickonBuy,
  clickonSell,
  setstockinfo,
  setbuyorsells,
  setclickonBuy,
  setclickonsell,
}) {
  const [age, setAge] = React.useState("");
  const [stockoverview,setstockoverview] = React.useState([]);
  const [companyoverview,setcompanyoverview] = React.useState([]);
  const [ordersType,setorderType] = React.useState("");
  const [productType,setproductType] = React.useState("");
  const [Quantity,setQuantity] = React.useState(0);
  const [successorder,setsuccessorder] = React.useState(false);
  const [moneyError,setmoneyError] = React.useState(false);
  const [errormsg,seterrormsg] = React.useState("");
  let stock_Name = useSelector(stockSelect);
  let get_Stock_function = useSelector(getorderersSelect)
  let final_blnc = useSelector(NetprofitSelect);
  
  let Bidsvalue = [];
  let Askvalue = [];


 


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

  async function get_share_details(){
    let response = await fetch(BASE_URL + '/get_share_details', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'symbol':stock_Name 
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      if(message=='success'){
      console.log(json['share_data'])
      setcompanyoverview(json['share_data']);
      }
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
  }


  async function buy_stock(){
    let response = await fetch(BASE_URL + '/buy_stock', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'order_type': ordersType,
          'product_type':productType,
          'symbol':companyoverview.symbol,
          'quantity':Quantity,
          'buy_price':companyoverview.cmp,
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      console.log(message)
      if(message=='success'){
        final_blnc()
        get_Stock_function()
        setsuccessorder(true)
        setTimeout(() => {
          setsuccessorder(false)
        }, 4000);
      }
      else{
        seterrormsg(message);
      }
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
  }


  async function sell_stock(){
    let response = await fetch(BASE_URL + '/sell_stock', {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({
          'order_type': ordersType,
          'product_type':productType,
          'symbol':companyoverview.symbol,
          'quantity':Quantity,
          'buy_price':companyoverview.cmp,
      })
  })
  if (response.ok) {
      let json = await response.json();
      let message = json["message"]
      console.log(message)
      if(message=='success'){
        final_blnc()
        get_Stock_function()
        setsuccessorder(true)
        setTimeout(() => {
          setsuccessorder(false)
        }, 4000);
      }
      else{
        seterrormsg(message);
        setmoneyError(true);
        setTimeout(() => {
          setmoneyError(false)
        }, 4000);
      }
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
  }


  useLayoutEffect(()=>{
    get_share_details()
  },[stock_Name])

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const closethetab = () => {
    setopenoverview(false);
  };
  const buyShares = () => {
    setstockinfo(false);
    setbuyorsells(true);
    setclickonBuy(true);
    setclickonsell(false);
  };
  const sellShares = () => {
    setstockinfo(false);
    setbuyorsells(true);
    setclickonBuy(false);
    setclickonsell(true);
  };
  const sellButton = () => {
    if (clickonBuy) {
      setclickonBuy(false);
      setclickonsell(true);
    }
  };
  const buyButton = () => {
    if (clickonSell) {
      setclickonsell(false);
      setclickonBuy(true);
    }
  };
useLayoutEffect(()=>{
  fetch(`https://api.twelvedata.com/time_series?apikey=e9372b1dc5544638a93c0311a3a681ae&interval=1day&symbol=${stock_Name}&outputsize=1`)
  .then((response)=> response.json())
  .then((data)=> setstockoverview(...data["values"]))
},[stock_Name])
console.log(stockoverview);
const quntity = 10;
const price = stockoverview?.close;
for(let i =0;i<5;i++){
let   quntities = quntity + (50+i);
   let prices  = price - i;
  Bidsvalue.push({prices,quntities})
  let   quntitiess = quntity + (80+i);
   let pricess  = price + i;
   
   Askvalue.push({pricess,quntitiess})
}
console.log(ordersType,productType);
const submitOrder = (e)=>{
  e.preventDefault();
  if(clickonBuy===true){
    buy_stock();
  }
  else{
    sell_stock();
  }
}
console.log(get_Stock_function);
  return (
    <div className="Overviews">
      {stockinnfo && (
        <div className="Overview">
          <div className="Heading-overview">
            <p className="Heading-overview-close" onClick={closethetab}>
              <CloseIcon className="overview-close-icon" />
            </p>
            <p className="companyname">{companyoverview.company_name}</p>
          </div>
          <div className="basic-overview">
            <div className="basic-overview-left">
              <p className="company-symbol">{companyoverview.symbol}</p>
              <p className="nse-eq">{companyoverview.exchange}</p>
            </div>
            <div className="basic-overview-right">
              <p className="current-price">{companyoverview.cmp}</p>
              <p className="chnage-in-price">{companyoverview.stock_diff} ({companyoverview.percent})</p>
            </div>
          </div>
          <div className="market-status">
            <div className="buy-bttn" onClick={buyShares}>
              Buy
            </div>
            <div className="sel-btn" onClick={sellShares}>
              Sell
            </div>
            {/* <div className="makefavorite">
              <FavoriteBorderIcon />
            </div> */}
          </div>
          <div className="market-status-overview">
            <div className="markt-stats">
              <div className="markt-stats-header">Market Stats</div>
              <div className="markt-stats-body">
                <div className="markt-stats-body-left">
                  <div className="open-div">
                    <p className="open">Open</p>
                    <p className="open-price">{stockoverview.open}</p>
                  </div>
                  <div className="upper-circut-div">
                    <p className="Upper-Circuit">High</p>
                    <p className="Upper-circut-price">{stockoverview.high}</p>
                  </div>
                  <div className="volume-div">
                    <p className="volume">Volume</p>
                    <p className="volume-number">{stockoverview.volume}</p>
                  </div>
                </div>
                <div className="markt-stats-body-right">
                  <div className="close-div">
                    <p className="close">Close</p>
                    <p className="close-price">{stockoverview.close}</p>
                  </div>
                  <div className="lower-circut-div">
                    <p className="lower-Circuit">Low</p>
                    <p className="lower-circut-price">{stockoverview.low}</p>
                  </div>
                  <div className="atp-div">
                    <p className="atp">Date Time</p>
                    <p className="volume-number">{stockoverview.datetime}</p>
                  </div>
                </div>
                {/* <div className="footer">52w high</div> */}
              </div>
            </div>

            <div className="markt-depth">
              <div className="markt-stats-header">Market Depth</div>
              <div className="markt-stats-body">
                <div className="markt-depth-body-left">
                  <div className="depth-header">
                    <p className="bid-price">Bip Price</p>
                    <p className="qty">Quantity</p>
                  </div>
                  <div className="depth-body-datas">
                  {
                    Bidsvalue?.map(e=>{
                     return (
                      <div className="depth-body-data">
                      <p className="price">{e.prices}</p>
                      <p className="qntyty">{e.quntities}</p>
                    </div>
                     )
                    })
                  }
                    
                 
                  </div>
                </div>
                <div className="markt-depth-body-right">
                  <div className="depth-header">
                    <p className="ask-price">Ask Price</p>
                    <p className="qty">Quantity</p>
                  </div>
                  <div className="depth-body-datas">
                  {
                    Askvalue?.map(e=>{
                      return(
                        <div className="depth-body-data">
                      <p className="price">{e.pricess}</p>
                      <p className="qntyty">{e.quntitiess}</p>
                    </div>
                      )
                    })
                  }
                 
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {buyorsells && (
        <div className="Overview">
          <div className="Heading-overview">
            <p className="Heading-overview-close" onClick={closethetab}>
              <CloseIcon className="overview-close-icon" />
            </p>
            <p className="companyname">{companyoverview.company_name}</p>
          </div>
          <div className="basic-overview">
            <div className="basic-overview-left">
              <p className="company-symbol">{companyoverview.symbol}</p>
              <p className="nse-eq">{companyoverview.exchange}</p>
            </div>
            <div className="basic-overview-right">
              <p className="current-price">{companyoverview.cmp}</p>
              <p className="chnage-in-price">{companyoverview.stock_diff} ({companyoverview.percent})</p>
            </div>
          </div>
          <div className="buyorsell">
            <div
              className={clickonBuy ? "buy-bttns" : "buy-bttnss"}
              onClick={buyButton}
            >
              Buy
            </div>
            <div
              className={clickonSell ? "sel-btnss" : "sel-btns"}
              onClick={sellButton}
            >
              Sell
            </div>
          </div>
          <form>
          <div className="takesomeinputs">
            <TextField
              id="outlined-basic"
              label="Quantity"
          value ={Quantity}
              type="number"
              size="small"
              fullWidth
              required
              onChange={(e)=>setQuantity(e.target.value)}
            />
            <div>
              <div className="takesomeinput">
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small">Product</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={productType}
                    required
                    label="Product"
                    onChange={(e)=> setproductType(e.target.value)}
                  >
                    <MenuItem value={"Delivery"}>Delivery</MenuItem>
                    
                  </Select>
                </FormControl>
              </div>
              <div className="takesomeinput">
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small">Order Type</InputLabel>
                  <Select
                  required
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={ordersType}
                    label="Order Type"
                    onChange={(e)=> setorderType(e.target.value)}
                  >
                  
                    <MenuItem value={"Market"}>Market</MenuItem>
                    
                  </Select>
                </FormControl>
              </div>
              
            </div>
            <div
              className={clickonBuy ? "place-orders-buy" : "place-orders-sell"}
            >
             <button className="btm-order" type="submit" onClick={submitOrder}>
             <div className="place-ordr">
                <p>
                  <ShoppingCartIcon />
                </p>
                <p>Place {clickonBuy?"Buy":"Sell"} Order</p>
              </div>
             </button>
            </div>
          </div>
          </form>

          
        </div>

        
      )}
      {
  successorder &&
  <div
             className="sucesorder"
            >
            
             
               
                <p>Your {clickonBuy?"Buy":"Sell"} Order has been Placed successfully.
                Please Check Order Sections
                </p>
            
             
            </div>
}

{
  moneyError  &&
  <div
             className="sucesorders"
            >
            
             
               
                <p>
                {errormsg}
                </p>
            
             
            </div>
}
    </div>
  );
}

export default Overview;
