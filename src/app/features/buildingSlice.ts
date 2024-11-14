import { createSlice } from "@reduxjs/toolkit";

interface CurrentBuildingState {
    currentBuilding: number;
}
const initialState: CurrentBuildingState = {
    currentBuilding: -1,
};

const currentBuildingSlice = createSlice({
  name: "currentBuilding",
  initialState,
  reducers: {
    setCurrentBuilding(state, action) {
      return {
        ...state,
        currentBuilding: action.payload,
      };
    },
  },
});
export const { setCurrentBuilding } = currentBuildingSlice.actions;
export default currentBuildingSlice.reducer;
