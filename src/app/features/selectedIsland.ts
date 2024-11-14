import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Island } from "../../interfaces/farm";

interface SelectedIslandState {
    selectedIsland?: Island;
}
const initialState: SelectedIslandState = {
    selectedIsland: undefined,
};

const SelectedIslandSlice = createSlice({
  name: "selectedIsland",
  initialState,
  reducers: {
    setSelectedIsland(state, action: PayloadAction<{island: Island}>) {
      return {
        ...state,
        selectedIsland: action.payload.island,
      };
    },
  },
});
export const { setSelectedIsland } = SelectedIslandSlice.actions;
export default SelectedIslandSlice.reducer;
