import React, { useEffect, useState } from "react";
import "./Rightbodyfooter.css";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getorderersName } from "../../../features/stockSlice";
const orderData = ["Symbol","Status","Time","Product","Quantity","Order Price","Order Type","Amount	"];
const positionData = ["Symbol","Product","Net Qty","Avg. Price","Order Type","LTP","P&L"];
const HoldingData = ["Symbol","Net Qty","Avg. Price","LTP","Current Value","P&L"]
function Rightbodyfooter({
  openholding,
  setopenholding,
  fullscreen,
  setfullscreen,
})
{
  const [stockorder,setstockorder]= useState(false);
  const [stockposition,setstockposition] = useState(false);
  const[stockholding,setstockholding] = useState(false);
  const [orderDatas,setorderData] = useState([]);
  const [positioncmp,setpositioncmp] = useState([]);
  const [holdingDataas,setholdingDataas] = useState([]);
  const [holdingcmps,setholdingcmps] = useState([]);
  const dispatch = useDispatch();
  let possitioncmpp = [];
  let cmpHoldings = [];
  const handleorder = () => {
    setopenholding(true);
    setstockorder(true);
    setstockholding(false);
    setstockposition(false);
  };
  const handlepositions = () => {
    setopenholding(true);
    setstockorder(false);
    setstockholding(false);
    setstockposition(true);
  };
  const handleholding = () => {
    setopenholding(true);
    setstockorder(false);
    setstockholding(true);
    setstockposition(false);
  };
  const handlecollapse = () => {
    if (openholding == true) {
      setopenholding(false);
      setstockorder(false);
      setstockposition(false);
      setstockholding(false)
    } else {
      setopenholding(true);
    }
    if (fullscreen == true) {
      setopenholding(false);
      setfullscreen(false);
    }
  };
  const handlefullscreen = () => {
    if (fullscreen == false) {
      setfullscreen(true);
    } else {
      setfullscreen(false);
    }
  };

  async function get_orders(){
    let response = await fetch('/get_orders')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'success'){
    
        setholdingDataas(json['holding_data'])
        setpositioncmp(json['position_cmp'])
        setholdingcmps(json['holdin_cmp'])
        setorderData(json['data'])}
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }

  useLayoutEffect(()=>{
    get_orders()
    // dispatch(getorderersName(get_orders))
  },[])
  useEffect(()=>{
    dispatch(getorderersName(get_orders))
  })
positioncmp.forEach((e)=>{
  possitioncmpp.push(e.closing_price)
})
holdingcmps.forEach((e)=>{
  cmpHoldings.push(e.closing_price)
})

  return (
    <div
      className={`${openholding && "rightbody-btm-ftr"} 
                  ${fullscreen && "fullScreen"}
                  ${(openholding == false) && "notfullScreen" }
                 
                  `}
    >
      <div className="Rightbodyfooter">
        <div className={stockorder?"ordersss":"orders"} onClick={handleorder}>
          {" "}
          ORDERS
        </div>
        <div className={stockposition ? "ordersss":"POSITION"} onClick={handlepositions}>
          {" "}
          POSITION
        </div>
        <div className={stockholding?"ordersss":"orders"} onClick={handleholding}>
          HOLDING
        </div>
        <div className="open-screen">
          <div className="screencoll1" onClick={handlefullscreen}>
            <CloseFullscreenIcon className="closefullscree" />
          </div>
          <div className="screencoll2" onClick={handlecollapse}>
            <UnfoldLessIcon className="collaspe" />
          </div>
        </div>
      </div>
      {
        stockorder &&
      (
        <div className="order-holding-position">
      <table class="content-table" width="100%">
        <thead>
          <tr>
          {
            orderData.map(e=>{
            return  <th>{e}</th>
            })
          }
          </tr>
        </thead>
        <tbody className="ponts">
         
 
          
            
            {
              orderDatas.length > 0 ?
              orderDatas?.map((e) => {
              let time = e.time.split('T')[1].split('.')[0]+' '+'('+e.time.split('T')[0]+')';
              return (
                <tr>
                <td>{e.share_symbol}</td>
                <td className={e.status ==true ? "green" : "red" }>{e.status ==true ? "Complete" : "Reject" }</td>
                <td>{time}</td>
                <td>{e.product}</td>
                <td>{e.quantity}</td>
                <td>{e.ltp}</td>
                <td className={e.share_deal_type =="BUY"?"green":"red"}>{e.share_deal_type}</td>
                <td>{e.price}</td>
                </tr>
                )
            })
            :
            <div className="emptywatchlsts">
              <div className="Emptyimgcontainer">
                <img
                  src="https://pro.upstox.com/assets/empty.svg"
                  className="emptyimg"
                />
                <p className="emptytagline">It’s empty in here.</p>
              </div>
            </div>
            }
          
        </tbody>
      </table>
      </div>
      )
      }
      {
        stockposition && (
          <div className="order-holding-position">
      <table class="content-table" width="100%">
        <thead>
          <tr>
          {
            positionData?.map(e=>{
            return  <th>{e}</th>
            })
          }
          </tr>
        </thead>
       <tbody className="ponts">
       {
         orderDatas.length > 0 ?
         orderDatas?.map((e,idx) => {
        let pricece = (possitioncmpp[idx])-(e.ltp)
              return (
                <tr>
                <td>{e.share_symbol}</td>
                
                <td>{e.product}</td>
                <td>{e.quantity}</td>
                <td>{e.ltp}</td>
                <td className={e.share_deal_type =="BUY"?"green":"red"}>{e.share_deal_type}</td>
                <td>{possitioncmpp[idx]}</td>
                <td className={pricece>0?"green":"red"}>{(pricece.toFixed(2))*(e.quantity)}</td>
                </tr>
                )
            })
            :
            <div className="emptywatchlsts">
              <div className="Emptyimgcontainer">
                <img
                  src="https://pro.upstox.com/assets/empty.svg"
                  className="emptyimg"
                />
                <p className="emptytagline">It’s empty in here.</p>
              </div>
            </div>
            }
       </tbody>
      </table>
      </div>
        )
      }
     {
       stockholding && (
        <div className="order-holding-position">
      <table class="content-table" width="100%">
        <thead>
          <tr>
          {
            HoldingData.map(e=>{
            return  <th>{e}</th>
            })
          }
          </tr>
        </thead>
        
       
        <tbody className="ponts">
       {
         holdingDataas.length > 0 ?
         holdingDataas?.map((e,idx) => {
        let pricece = (cmpHoldings[idx])-(e.avg_price)
              return (
                <tr>
                <td>{e.share_symbol}</td>
                
              
                <td>{e.quantity}</td>
                <td>{e.avg_price}</td>
                
                <td>{cmpHoldings[idx]}</td>
                <td>{(parseFloat((e.avg_price)*(e.quantity)) + parseFloat((pricece.toFixed(2))*(e.quantity))).toFixed(2) }</td>
                <td className={pricece>0?"green":"red"}>{((pricece.toFixed(2))*(e.quantity)).toFixed(2)}</td>
               
                </tr>
                )
            })
            :
            <div className="emptywatchlsts">
              <div className="Emptyimgcontainer">
                <img
                  src="https://pro.upstox.com/assets/empty.svg"
                  className="emptyimg"
                />
                <p className="emptytagline">It’s empty in here.</p>
              </div>
            </div>
            }
       </tbody>
      
      </table>
      </div>
       )
     }
    </div>
  );
}

export default Rightbodyfooter;
