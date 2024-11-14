import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExchangeSliceState {
  exchange: string;
}

const initialState: ExchangeSliceState = {
  exchange: "",
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setExchange: (state, action: PayloadAction<string>) => {
      state.exchange = action.payload;
    },
    
  },
});

export const { setExchange } = exchangeSlice.actions;
export default exchangeSlice.reducer;
