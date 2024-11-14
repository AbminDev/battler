import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedHeroState {
  uid: string;
  lvl?: number;
}
const initialState: SelectedHeroState = {
  uid: '',
  lvl: undefined,
};

const selectedHeroSlice = createSlice({
  name: "selectedHero",
  initialState,
  reducers: {
    setSelectedHero: (state, action: PayloadAction<{ uid: string; lvl?: number}>) => {
      state.uid = action.payload.uid;
      state.lvl = action.payload.lvl;
    },
  },
});
export const { setSelectedHero } = selectedHeroSlice.actions;
export default selectedHeroSlice.reducer;
