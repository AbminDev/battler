import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TutorialSave} from "../../interfaces/tutorial";
import {BattleSaves} from "../../endpoints/mock";
import { FullHero } from "../../interfaces/hero";


interface HeroesState {
    heroesList: FullHero[];

  }

const initialState: HeroesState = {
    heroesList: [],
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroesList(state, action: PayloadAction<FullHero[]>) {
      state.heroesList = action.payload;
    },
  },
});

export const { setHeroesList  } = heroSlice.actions;

export default heroSlice.reducer;
