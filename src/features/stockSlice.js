import { createSlice } from "@reduxjs/toolkit";
export const stockSlice = createSlice({
  name: "stock",

  initialState: {
    stock: "",
    companyname:"",
    exchange:"",
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
      }
  },
});

export const { stockName,companyName,exchangeName,getorderersName,defaultwatchName } = stockSlice.actions;

export const stockSelect = (state) =>state.stock.stock;
export const companySelect = (state) => state.stock.companyname;
export const exchangeSelect = (state) => state.stock.exchange;
export const getorderersSelect = (state)=> state.stock.getorderers;
export const defaultwatchSelect = (state)=> state.stock.defaultwatch;
export default stockSlice.reducer;