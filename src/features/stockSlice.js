import { createSlice } from "@reduxjs/toolkit";
export const stockSlice = createSlice({
  name: "stock",

  initialState: {
    stock: "",
    companyname:"",
    exchange:"",
    NetProfit : function(){

    },
    getorderers : function(){

    },
    defaultwatch:[]
  },

  reducers: {
    stockName: (state, action) => {
      state.stock = action.payload;
    },
    companyName: (state, action) => {
        state.companyname = action.payload;
      },
      exchangeName: (state, action) => {
        state.exchange = action.payload;
      },
      getorderersName:(state,action)=>{
        state.getorderers = action.payload;
      },
      defaultwatchName:(state,action)=>{
        state.defaultwatch = action.payload;
      },
      NetProfitName:(state,action)=>{
          state.NetProfit = action.payload;
      }

  },
});

export const { stockName,companyName,exchangeName,getorderersName,defaultwatchName,NetProfitName } = stockSlice.actions;

export const stockSelect = (state) =>state.stock.stock;
export const companySelect = (state) => state.stock.companyname;
export const exchangeSelect = (state) => state.stock.exchange;
export const getorderersSelect = (state)=> state.stock.getorderers;
export const defaultwatchSelect = (state)=> state.stock.defaultwatch;
export const NetprofitSelect = (state)=> state.stock.NetProfit;
export default stockSlice.reducer;