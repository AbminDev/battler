import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TutorialSave} from "../../interfaces/tutorial";

// export interface TutorialSave {
//   enemyId: number;
// }
interface TutorialSaveState {
  tutorialSave: {
    save: TutorialSave | null
  };
}

const initialState: TutorialSaveState = {
  tutorialSave: {save: null},
};

const tutorialSaveSlice = createSlice({
  name: "tutorialSave",
  initialState,
  reducers: {
    setSave(state, action: PayloadAction<TutorialSave>) {
      state.tutorialSave.save = action.payload;
    },
    clearSave(state) {
      state.tutorialSave.save = null;
    },
  },
});

export const { setSave, clearSave } = tutorialSaveSlice.actions;

export default tutorialSaveSlice.reducer;
