import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TutorialSave} from "../../interfaces/tutorial";
import {BattleSaves} from "../../endpoints/mock";


interface BattleSaveState {
  battleSave: {
    save: BattleSaves | null
  };
}

const initialState: BattleSaveState = {
  battleSave: {save: null},
};

const battleSaveSlice = createSlice({
  name: "battleSave",
  initialState,
  reducers: {
    setBattleSave(state, action: PayloadAction<BattleSaves>) {
      state.battleSave.save = action.payload;
    },
    clearBattleSave(state) {
      state.battleSave.save = null;
    },
  },
});

export const { setBattleSave, clearBattleSave } = battleSaveSlice.actions;

export default battleSaveSlice.reducer;
