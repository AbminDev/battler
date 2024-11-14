import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resource } from "../../mock/resources";
import { DisplayData } from "../../utils/lootBoxHandler";

// Визначення інтерфейсу стану
interface DungeonCompletedState {
  dungeonCompleted: boolean;
  resources: DisplayData[];
}

// Початковий стан
const initialState: DungeonCompletedState = {
  dungeonCompleted: false,
  resources: [],
};

const dungeonCompletedSlice = createSlice({
  name: "dungeonCompleted",
  initialState,
  reducers: {
    // Редуктор для встановлення стану dungeonCompleted та ресурсів
    completeDungeon(state, action: PayloadAction<DisplayData[]>) {
      state.dungeonCompleted = true;
      state.resources = action.payload;
    },
    // Редуктор для скидання стану dungeonCompleted та ресурсів
    resetDungeon(state) {
      state.dungeonCompleted = false;
      state.resources = [];
    },
  },
});

// Експорт дій
export const { completeDungeon, resetDungeon } = dungeonCompletedSlice.actions;

// Експорт редюсера
export default dungeonCompletedSlice.reducer;
