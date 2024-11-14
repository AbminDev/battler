// store/questsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resources } from "../../enums/resources";


export enum TaskStatus {
  NotDone,
  Done,
  Claimed,
}

interface QuestProgress {
  amount: number;
  resource: Resources;
}
export interface QuestTask {
  taskId: number;
  currentProgress: QuestProgress[];
  status: TaskStatus;
}

interface QuestsState {
  quests: QuestTask[];
}

const initialState: QuestsState = {
  quests: [],
};

const questsSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {
    setQuests(state, action: PayloadAction<QuestTask[]>) {
      state.quests = action.payload;
    },
    // Додайте інші редюсери за потреби
  },
});

export const { setQuests } = questsSlice.actions;
export default questsSlice.reducer;
