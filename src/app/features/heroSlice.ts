import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TutorialSave} from "../../interfaces/tutorial";
import {BattleSaves} from "../../endpoints/mock";


interface HeroData {
  hero: {heroId: number}
}

const initialState: HeroData = {
  hero: {heroId: 0},
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHero(state, action: PayloadAction<{heroId: number}>) {
      state.hero = action.payload;
    },
  },
});

export const { setHero,  } = heroSlice.actions;

export default heroSlice.reducer;
