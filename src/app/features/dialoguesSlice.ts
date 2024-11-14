import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dialogues {
  id: number;
}
interface DialoguesState {
  dialogueInfo: Dialogues | null;
}

const initialState: DialoguesState = {
  dialogueInfo: null,
};

const dialoguesSlice = createSlice({
  name: "dialogues",
  initialState,
  reducers: {
    setDialogueInfo(state, action: PayloadAction<Dialogues>) {
      state.dialogueInfo = action.payload;
    },
    clearDialogue(state) {
      state.dialogueInfo = null;
    },
  },
});

export const { setDialogueInfo, clearDialogue } = dialoguesSlice.actions;

export default dialoguesSlice.reducer;
