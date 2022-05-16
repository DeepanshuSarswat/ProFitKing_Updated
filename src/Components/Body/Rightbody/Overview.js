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
  return (
    <div className="Overviews">
      {stockinnfo && (
        <div className="Overview">
          <div className="Heading-overview">
            <p className="Heading-overview-close" onClick={closethetab}>
              <CloseIcon className="overview-close-icon" />
            </p>
            <p className="companyname">HCL TECHNOLOGIES LTD</p>
          </div>
          <div className="basic-overview">
            <div className="basic-overview-left">
              <p className="company-symbol">HCLTECH</p>
              <p className="nse-eq">NSE EQ</p>
            </div>
            <div className="basic-overview-right">
              <p className="current-price">1079</p>
              <p className="chnage-in-price">-13.25(1.21%)</p>
            </div>
          </div>
          <div className="market-status">
            <div className="buy-bttn" onClick={buyShares}>
              Buy
            </div>
            <div className="sel-btn" onClick={sellShares}>
              Sell
            </div>
            <div className="makefavorite">
              <FavoriteBorderIcon />
            </div>
          </div>
          <div className="market-status-overview">
            <div className="markt-stats">
              <div className="markt-stats-header">Market Stats</div>
              <div className="markt-stats-body">
                <div className="markt-stats-body-left">
                  <div className="open-div">
                    <p className="open">Open</p>
                    <p className="open-price">1094.00</p>
                  </div>
                  <div className="upper-circut-div">
                    <p className="Upper-Circuit">Upper Circuit</p>
                    <p className="Upper-circut-price">1187.15</p>
                  </div>
                  <div className="volume-div">
                    <p className="volume">Volume</p>
                    <p className="volume-number">29,88,180</p>
                  </div>
                </div>
                <div className="markt-stats-body-right">
                  <div className="close-div">
                    <p className="close">Close</p>
                    <p className="close-price">1094.00</p>
                  </div>
                  <div className="lower-circut-div">
                    <p className="lower-Circuit">Lower Circuit</p>
                    <p className="lower-circut-price">1187.15</p>
                  </div>
                  <div className="atp-div">
                    <p className="atp">Avg. Traded Prc.</p>
                    <p className="volume-number">29,88,180</p>
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
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>
                  </div>
                </div>
                <div className="markt-depth-body-right">
                  <div className="depth-header">
                    <p className="ask-price">Ask Price</p>
                    <p className="qty">Quantity</p>
                  </div>
                  <div className="depth-body-datas">
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>{" "}
                    <div className="depth-body-data">
                      <p className="price">0</p>
                      <p className="qntyty">0</p>
                    </div>
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
            <p className="companyname">HCL TECHNOLOGIES LTD</p>
          </div>
          <div className="basic-overview">
            <div className="basic-overview-left">
              <p className="company-symbol">HCLTECH</p>
              <p className="nse-eq">NSE EQ</p>
            </div>
            <div className="basic-overview-right">
              <p className="current-price">1079</p>
              <p className="chnage-in-price">-13.25(1.21%)</p>
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
          <div className="takesomeinputs">
            <TextField
              id="outlined-basic"
              label="Quantity*"
              // defaultValue="Small"
              type="number"
              size="small"
              fullWidth
            />
            <div>
              <div className="takesomeinput">
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small">Product</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="Product"
                    onChange={handleChange}
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
              <div className="takesomeinput">
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <InputLabel id="demo-select-small">Order Type</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="Order Type"
                    onChange={handleChange}
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
              <TextField
                id="outlined-basic"
                label="Price*"
                // defaultValue="Small"
                type="number"
                size="small"
                fullWidth
              />
            </div>
            <div
              className={clickonBuy ? "place-orders-buy" : "place-orders-sell"}
            >
              <div className="place-ordr">
                <p>
                  <ShoppingCartIcon />
                </p>
                <p>Place Sell Order</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;
